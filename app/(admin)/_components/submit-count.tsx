"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { graphql } from "@/gql";
import { SubmissionStatus, type SubmissionWhereInput } from "@/gql/graphql";
import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

const SUBMISSIONS_TOTAL_COUNT_QUERY = graphql(`
  query SubmissionsTotalCount($where: SubmissionWhereInput!) {
    submissions(where: $where) {
      totalCount
    }
  }
`);

type TimeRange = "daily" | "weekly" | "all";

const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  daily: "今日",
  weekly: "本週",
  all: "全部",
};

export default function SubmissionsTotalCount() {
  const [showSuccessOnly, setShowSuccessOnly] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("daily");

  const [getSubmissionsTotalCount, { data, loading }] = useLazyQuery(SUBMISSIONS_TOTAL_COUNT_QUERY);

  useEffect(() => {
    const now = new Date();

    const timeRangeWhere: Record<TimeRange, SubmissionWhereInput> = {
      daily: {
        submittedAtGTE: new Date(now.setDate(now.getDate() - 1)).toISOString(),
      },
      weekly: {
        submittedAtGTE: new Date(now.setDate(now.getDate() - 7)).toISOString(),
      },
      all: {},
    };

    const where: SubmissionWhereInput = showSuccessOnly
      ? {
        ...timeRangeWhere[timeRange],
        status: SubmissionStatus.Success,
      }
      : timeRangeWhere[timeRange];

    getSubmissionsTotalCount({ variables: { where } });
  }, [showSuccessOnly, timeRange, getSubmissionsTotalCount]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>提交總數</CardTitle>
        <CardDescription>
          所有使用者在這段期間的總提交數量。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
          <TabsList>
            {Object.entries(TIME_RANGE_LABELS).map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={timeRange} className="mt-4">
            <div className="flex items-end gap-2 text-3xl font-bold">
              {!loading && (data?.submissions.totalCount?.toLocaleString("zh-TW") ?? 0)}
              {loading && <Skeleton className="h-8 w-24" />}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {TIME_RANGE_LABELS[timeRange]}的提交數量
            </p>
          </TabsContent>
        </Tabs>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="success-only"
            checked={showSuccessOnly}
            onCheckedChange={(checked) => setShowSuccessOnly(checked === true)}
          />
          <Label
            htmlFor="success-only"
            className="cursor-pointer text-sm font-normal"
          >
            只顯示成功的提交
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
