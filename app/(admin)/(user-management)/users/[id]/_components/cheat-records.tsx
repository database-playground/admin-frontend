"use client";

import { CardLayout } from "@/components/card-layout";
import { StyledLink } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { AlertTriangle } from "lucide-react";

const USER_CHEAT_RECORDS_CARD_FRAGMENT = graphql(`
  fragment UserCheatRecordsCard on User {
    id
    cheating
    cheatRecords(first: 5, where: { resolvedAtIsNil: true }) {
      totalCount
      edges {
        node {
          ...UserCheatRecordLine
          id
        }
      }
    }
  }
`);

const USER_CHEAT_RECORD_LINE_FRAGMENT = graphql(`
  fragment UserCheatRecordLine on CheatRecord {
    id
    cheatedAt
    reason
  }
`);

export function CheatRecordsCard({
  fragment,
}: {
  fragment: FragmentType<typeof USER_CHEAT_RECORDS_CARD_FRAGMENT>;
}) {
  const { id, cheating, cheatRecords } = useFragment(
    USER_CHEAT_RECORDS_CARD_FRAGMENT,
    fragment,
  );

  const unresolvedRecords = cheatRecords?.edges
    ?.map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined) ?? [];

  const totalUnresolved = cheatRecords?.totalCount ?? 0;

  return (
    <CardLayout
      title="作弊記錄"
      description="這個使用者的作弊記錄。"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-orange-500" />
          <div>
            <p className="text-3xl font-bold">{totalUnresolved}</p>
            <p className="text-sm text-muted-foreground">
              {cheating ? "未解決記錄" : "無未解決記錄"}
            </p>
          </div>
        </div>

        {unresolvedRecords.length > 0 && (
          <div className="border-t pt-4">
            <p className="mb-2 text-sm font-medium">最近未解決記錄</p>
            <div className="space-y-2">
              {unresolvedRecords.map((record) => {
                if (!record) return null;
                return (
                  <CheatRecordLine key={record.id} fragment={record} />
                );
              })}
            </div>
            {totalUnresolved > unresolvedRecords.length && (
              <div className="mt-2">
                <StyledLink href={`/cheat-records?user=${id}`}>
                  查看全部記錄 ({totalUnresolved})
                </StyledLink>
              </div>
            )}
          </div>
        )}

        {unresolvedRecords.length === 0 && totalUnresolved === 0 && (
          <p className="text-sm text-muted-foreground">暫無作弊記錄</p>
        )}
      </div>
    </CardLayout>
  );
}

function CheatRecordLine({
  fragment,
}: {
  fragment: FragmentType<typeof USER_CHEAT_RECORD_LINE_FRAGMENT>;
}) {
  const { id, reason, cheatedAt } = useFragment(
    USER_CHEAT_RECORD_LINE_FRAGMENT,
    fragment,
  );

  return (
    <div className="flex items-start justify-between gap-2 text-sm">
      <div className="flex-1">
        <StyledLink href={`/cheat-records/${id}`}>
          {reason}
        </StyledLink>
        <p className="text-xs text-muted-foreground">
          {new Date(cheatedAt).toLocaleString("zh-TW", {
            timeZone: "Asia/Taipei",
          })}
        </p>
      </div>
      <Badge variant="destructive">未解決</Badge>
    </div>
  );
}
