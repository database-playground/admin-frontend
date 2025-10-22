"use client";

import { CardLayout } from "@/components/card-layout";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { Remark } from "react-remark";

const DATABASE_DESCRIPTION_CARD_FRAGMENT = graphql(`
  fragment DatabaseDescriptionCard on Database {
    description
  }
`);

export function DescriptionCard({
  fragment,
}: {
  fragment: FragmentType<typeof DATABASE_DESCRIPTION_CARD_FRAGMENT>;
}) {
  const { description } = useFragment(DATABASE_DESCRIPTION_CARD_FRAGMENT, fragment);

  return (
    <CardLayout title="資料表描述" description="這個資料表的簡單介紹。">
      <article
        className={`
          prose
          dark:prose-invert
        `}
      >
        {!description
          ? <p className="text-muted-foreground">無描述</p>
          : <Remark>{description}</Remark>}
      </article>
    </CardLayout>
  );
}
