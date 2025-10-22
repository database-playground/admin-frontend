"use client";

import { CardLayout } from "@/components/card-layout";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { Clock } from "lucide-react";

const USER_AUDIT_INFO_CARD_FRAGMENT = graphql(`
  fragment UserAuditInfoCard on User {
    createdAt
    updatedAt
  }
`);

export function AuditInfoCard({ fragment }: { fragment: FragmentType<typeof USER_AUDIT_INFO_CARD_FRAGMENT> }) {
  const { createdAt, updatedAt } = useFragment(USER_AUDIT_INFO_CARD_FRAGMENT, fragment);

  return (
    <CardLayout title="稽核資訊" description="這個使用者的建立與更新時間。">
      <ul className="text-sm">
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>
            建立時間：{new Date(createdAt).toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>
            更新時間：{new Date(updatedAt).toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}
          </span>
        </li>
      </ul>
    </CardLayout>
  );
}
