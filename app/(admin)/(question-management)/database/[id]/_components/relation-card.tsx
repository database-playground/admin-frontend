"use client";

import { CardLayout } from "@/components/card-layout";
import { type FragmentType, graphql, useFragment } from "@/gql";

const DATABASE_RELATION_CARD_FRAGMENT = graphql(`
  fragment DatabaseRelationCard on Database {
    relationFigure
  }
`);

export function RelationCard({
  fragment,
}: {
  fragment: FragmentType<typeof DATABASE_RELATION_CARD_FRAGMENT>;
}) {
  const { relationFigure } = useFragment(DATABASE_RELATION_CARD_FRAGMENT, fragment);

  // Check if the relation figure looks like a URL (basic check)
  const isUrl = relationFigure.startsWith("http://")
    || relationFigure.startsWith("https://");

  return (
    <CardLayout title="關係圖" description="資料庫表格關係圖">
      {isUrl
        ? (
          <a href={relationFigure} aria-label="打開資料庫關係圖" target="_blank" rel="noopener noreferrer">
            <picture>
              <img
                src={relationFigure}
                alt="資料庫關係圖"
                className="h-auto max-h-80 w-full rounded object-contain"
              />
            </picture>
          </a>
        )
        : (
          <div>
            <pre
              className={`
                max-h-80 overflow-x-auto rounded-lg border bg-muted p-4
                font-mono text-sm whitespace-pre-wrap
              `}
            >
              {relationFigure}
            </pre>
          </div>
        )}
    </CardLayout>
  );
}
