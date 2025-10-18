"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { graphql } from "@/gql";
import { type SubmissionWhereInput } from "@/gql/graphql";
import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

const LOGIN_TOTAL_COUNT_QUERY = graphql(`
  query LoginTotalCount($where: EventWhereInput!) {
    events(where: $where) {
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

export default function LoginTotalCount() {
  const [timeRange, setTimeRange] = useState<TimeRange>("daily");

  const [getLoginTotalCount, { data, loading }] = useLazyQuery(LOGIN_TOTAL_COUNT_QUERY);

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

    const where = {
      ...timeRangeWhere[timeRange],
      type: "login",
    };

    getLoginTotalCount({ variables: { where } });
  }, [timeRange, getLoginTotalCount]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>登入總數</CardTitle>
        <CardDescription>
          所有使用者在這段期間的總登入次數。
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
              {!loading && (data?.events.totalCount?.toLocaleString("zh-TW") ?? 0)}
              {loading && <Skeleton className="h-8 w-24" />}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {TIME_RANGE_LABELS[timeRange]}的登入次數
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
