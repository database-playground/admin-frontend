"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StyledLink } from "@/components/ui/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { AlertTriangle } from "lucide-react";

const SUBMISSION_RESULT_CARD_FRAGMENT = graphql(`
  fragment SubmissionResultCard on Submission {
    queryResult {
      columns
      rows
      matchAnswer
    }
    question {
      id
    }
  }
`);

interface ResultCardProps {
  fragment: FragmentType<typeof SUBMISSION_RESULT_CARD_FRAGMENT>;
}

export function ResultCard({ fragment }: ResultCardProps) {
  const submission = useFragment(SUBMISSION_RESULT_CARD_FRAGMENT, fragment);
  const { queryResult, question } = submission;

  if (!queryResult) {
    return null;
  }

  const { columns, rows } = queryResult;

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>查詢結果</CardTitle>
        <CardDescription>查看查詢執行的結果</CardDescription>
      </CardHeader>
      <CardContent>
        {!queryResult.matchAnswer && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="font-bold">
              和正確答案不一致
            </AlertTitle>
            <AlertDescription>
              您可以到原始問題中取得正確答案應該輸出的結果。
              <StyledLink href={`/questions/${question.id}`}>原始問題 →</StyledLink>
            </AlertDescription>
          </Alert>
        )}

        {columns.length === 0 || rows.length === 0
          ? <p className="text-muted-foreground">查詢沒有回傳結果</p>
          : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column, index) => <TableHead key={index}>{column}</TableHead>)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>
                          {cell == null
                            ? (
                              <span className="text-muted-foreground italic">
                                NULL
                              </span>
                            )
                            : (
                              String(cell)
                            )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
