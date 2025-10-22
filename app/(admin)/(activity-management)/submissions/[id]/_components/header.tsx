"use client";

import { Badge } from "@/components/ui/badge";
import { graphql } from "@/gql";
import { SubmissionStatus } from "@/gql/graphql";
import { useSuspenseQuery } from "@apollo/client/react";

const SUBMISSION_HEADER_QUERY = graphql(`
  query SubmissionHeader($id: ID!) {
    submission(id: $id) {
      id
      status
      submittedAt
    }
  }
`);

interface HeaderProps {
  id: string;
}

const statusMap: Record<
  SubmissionStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  [SubmissionStatus.Success]: { label: "成功", variant: "default" },
  [SubmissionStatus.Failed]: { label: "錯誤", variant: "destructive" },
  [SubmissionStatus.Pending]: { label: "處理中", variant: "secondary" },
};

export function Header({ id }: HeaderProps) {
  const { data } = useSuspenseQuery(SUBMISSION_HEADER_QUERY, {
    variables: { id },
  });

  const submission = data.submission;
  const statusInfo = statusMap[submission.status] || { label: submission.status, variant: "outline" as const };

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold tracking-tight">
        提交記錄 #{submission.id}
      </h2>
      <div className="flex items-center gap-2">
        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        <span className="text-muted-foreground">
          提交時間：{new Date(submission.submittedAt).toLocaleString("zh-tw")}
        </span>
      </div>
    </div>
  );
}
