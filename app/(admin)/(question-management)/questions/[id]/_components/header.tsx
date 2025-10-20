"use client";

import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@apollo/client/react";
import { Suspense } from "react";
import { Remark } from "react-remark";
import { QUESTION_DETAIL_QUERY } from "./query";

export function Header({ id }: { id: string }) {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderMain id={id} />
    </Suspense>
  );
}

const difficultyMap = {
  easy: { label: "簡單", variant: "default" as const },
  medium: { label: "中等", variant: "secondary" as const },
  hard: { label: "困難", variant: "destructive" as const },
  unspecified: { label: "未指定", variant: "outline" as const },
};

function HeaderMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const question = data.question;
  const difficultyInfo = difficultyMap[question.difficulty as keyof typeof difficultyMap];

  const description = question.description?.split("\n")[0] || "此題目沒有描述";

  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">題目「{question.title}」</h1>
        <Badge variant="outline">{question.category}</Badge>
        <Badge variant={difficultyInfo.variant}>{difficultyInfo.label}</Badge>
      </div>
      <p className="text-muted-foreground">
        <Remark>{description}</Remark>
      </p>
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div>
      <h1 className="text-2xl font-bold">載入中…</h1>
      <p className="text-muted-foreground">載入中…</p>
    </div>
  );
}
