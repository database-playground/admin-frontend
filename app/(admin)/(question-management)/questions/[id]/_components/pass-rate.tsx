"use client";

import { CardLayout } from "@/components/card-layout";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { cn } from "@/lib/utils";

const QUESTION_PASS_RATE_FRAGMENT = graphql(`
  fragment QuestionPassRateCard on Question {
    id
    statistics {
      attemptedUsers
      correctSubmissionCount
      passedUsers
      submissionCount
    }
  }
`);

export function PassRateCard({ fragment }: { fragment: FragmentType<typeof QUESTION_PASS_RATE_FRAGMENT> }) {
  const { statistics } = useFragment(QUESTION_PASS_RATE_FRAGMENT, fragment);

  const passRateValue = statistics.attemptedUsers > 0
    ? (statistics.passedUsers / statistics.attemptedUsers) * 100
    : 0;

  const passRate = passRateValue.toFixed(1);

  const averageAttempts = statistics.attemptedUsers > 0
    ? (statistics.submissionCount / statistics.attemptedUsers).toFixed(1)
    : "0";

  const correctnessRateValue = statistics.submissionCount > 0
    ? (statistics.correctSubmissionCount / statistics.submissionCount) * 100
    : 0;

  const correctnessRate = correctnessRateValue.toFixed(1);

  // Determine color based on pass rate thresholds
  const passRateColorClass = cn(
    "text-3xl font-bold",
    passRateValue > 80 && `
      text-green-600
      dark:text-green-400
    `,
    passRateValue > 40 && passRateValue <= 80 && `
      text-yellow-600
      dark:text-yellow-400
    `,
    passRateValue <= 40 && `
      text-red-600
      dark:text-red-400
    `,
  );

  const correctnessRateColorClass = cn(
    "text-3xl font-bold",
    correctnessRateValue > 80 && `
      text-green-600
      dark:text-green-400
    `,
    correctnessRateValue > 40 && correctnessRateValue <= 80 && `
      text-yellow-600
      dark:text-yellow-400
    `,
    correctnessRateValue <= 40 && `
      text-red-600
      dark:text-red-400
    `,
  );

  return (
    <CardLayout title="通過率統計" description="題目的通過率與答題情況統計">
      <div
        className={`
          grid grid-cols-1 gap-4
          md:grid-cols-3
        `}
      >
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">通過率</p>
          <p className={passRateColorClass}>
            {passRate}%
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {statistics.passedUsers} / {statistics.attemptedUsers} 人通過
          </p>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">平均答題次數</p>
          <p className="text-3xl font-bold">{averageAttempts}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            共 {statistics.submissionCount} 次提交
          </p>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">正確率</p>
          <p className={correctnessRateColorClass}>
            {correctnessRate}%
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {statistics.correctSubmissionCount} / {statistics.submissionCount} 次正確
          </p>
        </div>
      </div>
    </CardLayout>
  );
}
