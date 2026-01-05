"use client";

import { CardLayout } from "@/components/card-layout";
import { Badge } from "@/components/ui/badge";
import { type FragmentType, graphql, useFragment } from "@/gql";

const QUESTION_VISIBLE_SCOPE_CARD_FRAGMENT = graphql(`
  fragment QuestionVisibleScopeCard on Question {
    id
    visibleScope
  }
`);

export function VisibleScopeCard({
  fragment,
}: {
  fragment: FragmentType<typeof QUESTION_VISIBLE_SCOPE_CARD_FRAGMENT>;
}) {
  const { visibleScope } = useFragment(
    QUESTION_VISIBLE_SCOPE_CARD_FRAGMENT,
    fragment,
  );

  return (
    <CardLayout
      title="可見範圍"
      description="只有擁有此 scope 的使用者可以看到此題目。"
    >
      <div>
        {!visibleScope ? <Badge variant="outline">所有人可見</Badge> : (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{visibleScope}</Badge>
            <span className="text-sm text-muted-foreground">
              僅限此 scope 的使用者
            </span>
          </div>
        )}
      </div>
    </CardLayout>
  );
}
