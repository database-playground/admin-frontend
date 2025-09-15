"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@apollo/client/react";
import { AlertTriangle, ChevronDown, Database, Table } from "lucide-react";
import { useState } from "react";
import { QUESTION_REFERENCE_ANSWER_RESULT_QUERY } from "./query";

export function ReferenceAnswerResult({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <details
        className="group overflow-hidden rounded-lg border border-border"
        onToggle={(e) => {
          setIsOpen(e.currentTarget.open);
        }}
      >
        <summary
          className={`
            flex cursor-pointer items-center justify-between bg-muted/50 px-4
            py-3 font-medium transition-all
            hover:bg-muted/70
            [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200
            group-open:[&_svg]:rotate-180
          `}
        >
          <span className="flex items-center gap-2 text-sm">
            <Table className="h-4 w-4 text-muted-foreground" />
            執行結果
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </summary>
        <div className="border-t border-border bg-background p-4">
          <ReferenceAnswerResultContent id={id} open={isOpen} />
        </div>
      </details>
    </div>
  );
}

function ReferenceAnswerResultContent({ id, open }: { id: string; open: boolean }) {
  const { data, loading, error } = useQuery(QUESTION_REFERENCE_ANSWER_RESULT_QUERY, {
    variables: { id },
    skip: !open,
  });

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="border-red-200 bg-red-50/50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-red-800">
          無法載入參考答案執行結果：{error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.question?.referenceAnswerResult) {
    return (
      <div
        className={`
          flex flex-col items-center justify-center py-12 text-muted-foreground
        `}
      >
        <Database className="mb-3 h-12 w-12 text-muted-foreground/30" />
        <p className="text-sm">此題目沒有參考答案執行結果</p>
      </div>
    );
  }

  const result = data.question.referenceAnswerResult;

  return (
    <div className="space-y-6">
      {result.columns && result.columns.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-600"></div>
            <h4 className="text-sm font-medium text-foreground">
              欄位結構
            </h4>
            <span className="text-xs text-muted-foreground">
              ({result.columns.length} 個欄位)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.columns.map((column, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`
                  border-blue-200 bg-blue-50 font-mono text-xs text-blue-700
                  hover:bg-blue-100
                `}
              >
                {column}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {result.rows && result.rows.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-green-600"></div>
            <h4 className="text-sm font-medium text-foreground">
              查詢結果
            </h4>
            <span className="text-xs text-muted-foreground">
              ({result.rows.length} 筆資料)
            </span>
          </div>
          <div
            className={`
              overflow-hidden rounded-md border border-border bg-background
            `}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {result.columns?.map((column, index) => (
                      <th
                        key={index}
                        className={`
                          px-4 py-3 text-left text-xs font-semibold
                          tracking-wider text-muted-foreground uppercase
                        `}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`
                        border-b border-border/50 transition-colors
                        last:border-b-0
                        hover:bg-muted/20
                        ${rowIndex % 2 === 0 ? "bg-background" : "bg-muted/10"}
                      `}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-4 py-3 text-sm"
                        >
                          <code
                            className={`
                              inline-block rounded border bg-muted px-2 py-1
                              font-mono text-xs text-foreground
                            `}
                          >
                            {cell || (
                              <span
                                className={`text-muted-foreground italic`}
                              >
                                NULL
                              </span>
                            )}
                          </code>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {(!result.rows || result.rows.length === 0) && (
        <div
          className={`
            flex flex-col items-center justify-center py-12
            text-muted-foreground
          `}
        >
          <Table className="mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm">查詢沒有返回任何資料列</p>
        </div>
      )}
    </div>
  );
}
