"use client";

import { CardLayout } from "@/components/card-layout";
import { Badge } from "@/components/ui/badge";
import { StyledLink } from "@/components/ui/link";
import { graphql, useFragment, type FragmentType } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import AppAvatar from "@/components/avatar";

const CHEAT_RECORD_DETAILS_QUERY = graphql(`
  query CheatRecordDetails($id: ID!) {
    cheatRecord(id: $id) {
      ...CheatRecordDetailsCard
      id
    }
  }
`);

const CHEAT_RECORD_DETAILS_FRAGMENT = graphql(`
  fragment CheatRecordDetailsCard on CheatRecord {
    id
    reason
    cheatedAt
    resolvedAt
    resolvedReason
    user {
      id
      name
      email
      avatar
    }
  }
`);

export function CheatRecordDetails({ id }: { id: string }) {
  const { data } = useSuspenseQuery(CHEAT_RECORD_DETAILS_QUERY, {
    variables: { id },
  });

  const fragment = data.cheatRecord;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <DetailsCard fragment={fragment} />
    </div>
  );
}

function DetailsCard({
  fragment,
}: {
  fragment: FragmentType<typeof CHEAT_RECORD_DETAILS_FRAGMENT>;
}) {
  const {
    reason,
    cheatedAt,
    resolvedAt,
    resolvedReason,
    user,
  } = useFragment(CHEAT_RECORD_DETAILS_FRAGMENT, fragment);

  const isResolved = !!resolvedAt;

  return (
    <CardLayout title="記錄詳情" description="作弊記錄的詳細資訊。">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">狀態</p>
          {isResolved ? (
            <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
              已解決
            </Badge>
          ) : (
            <Badge variant="destructive" className="mt-1">未解決</Badge>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">使用者</p>
          <div className="mt-1 flex items-center gap-2">
            <AppAvatar src={user.avatar} name={user.name} />
            <div>
              <StyledLink
                href={`/users/${user.id}`}
                className="font-medium"
              >
                {user.name}
              </StyledLink>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">原因</p>
          <p className="mt-1">{reason}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">作弊時間</p>
          <p className="mt-1">
            {new Date(cheatedAt).toLocaleString("zh-TW", {
              timeZone: "Asia/Taipei",
            })}
          </p>
        </div>

        {isResolved && (
          <>
            <div>
              <p className="text-sm font-medium text-muted-foreground">解決時間</p>
              <p className="mt-1">
                {new Date(resolvedAt).toLocaleString("zh-TW", {
                  timeZone: "Asia/Taipei",
                })}
              </p>
            </div>

            {resolvedReason && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">解決原因</p>
                <p className="mt-1">{resolvedReason}</p>
              </div>
            )}
          </>
        )}
      </div>
    </CardLayout>
  );
}
