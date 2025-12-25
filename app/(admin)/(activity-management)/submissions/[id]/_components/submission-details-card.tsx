"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type FragmentType, graphql, useFragment } from "@/gql";

const SUBMISSION_DETAILS_CARD_FRAGMENT = graphql(`
  fragment SubmissionDetailsCard on Submission {
    id
    submittedCode
    error
  }
`);

interface SubmissionDetailsCardProps {
  fragment: FragmentType<typeof SUBMISSION_DETAILS_CARD_FRAGMENT>;
}

export function SubmissionDetailsCard({ fragment }: SubmissionDetailsCardProps) {
  const submission = useFragment(SUBMISSION_DETAILS_CARD_FRAGMENT, fragment);

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
