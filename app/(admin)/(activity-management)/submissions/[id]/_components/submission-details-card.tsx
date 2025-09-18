"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSuspenseQuery } from "@apollo/client/react";
import { SUBMISSION_BY_ID_QUERY } from "./query";

interface SubmissionDetailsCardProps {
  id: string;
}

export function SubmissionDetailsCard({ id }: SubmissionDetailsCardProps) {
  const { data } = useSuspenseQuery(SUBMISSION_BY_ID_QUERY, {
    variables: { id },
  });

  const submission = data.submission;

  return (
    <Card>
      <CardHeader>
        <CardTitle>提交詳情</CardTitle>
        <CardDescription>查看提交的程式碼和錯誤資訊</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold">提交的程式碼</h4>
          <pre className="rounded-md bg-muted p-4 text-sm whitespace-pre-wrap">
            <code>{submission.submittedCode}</code>
          </pre>
        </div>

        {submission.error && (
          <div>
            <h4 className="mb-2 font-semibold text-destructive">錯誤訊息</h4>
            <pre
              className={`
                rounded-md bg-destructive/10 p-4 text-sm whitespace-pre-wrap
                text-destructive
              `}
            >
              <code>{submission.error}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
