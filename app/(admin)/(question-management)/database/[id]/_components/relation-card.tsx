"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client/react";
import { DATABASE_DETAIL_QUERY } from "./query";

export function RelationCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(DATABASE_DETAIL_QUERY, {
    variables: { id },
  });

  const database = data.database;

  // Check if the relation figure looks like a URL (basic check)
  const isUrl = database.relationFigure.startsWith("http://") || database.relationFigure.startsWith("https://");

  return (
    <CardLayout title="關係圖" description="資料庫表格關係圖">
      <div className="space-y-4">
        {isUrl
          ? (
            <div>
              <div className="overflow-hidden rounded-lg border">
                <picture>
                  <img
                    src={database.relationFigure}
                    alt="資料庫關係圖"
                    className="h-auto max-h-96 w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                </picture>
              </div>
            </div>
          )
          : (
            <div>
              <pre
                className={`
                  max-h-80 overflow-x-auto rounded-lg border bg-muted p-4
                  font-mono text-sm whitespace-pre-wrap
                `}
              >
              {database.relationFigure}
              </pre>
            </div>
          )}

        <div className="border-t pt-2">
          <p className="text-xs text-muted-foreground">
            關係圖顯示了資料庫中各表格之間的關聯性和主外鍵約束。
          </p>
        </div>
      </div>
    </CardLayout>
  );
}
