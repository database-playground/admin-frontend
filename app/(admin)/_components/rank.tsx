"use client";

import DataTablePagination from "@/components/data-table/pagination";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { RankingBy, RankingOrder, RankingPeriod } from "@/gql/graphql";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";

const OVERVIEW_RANKING_QUERY = graphql(`
  query OverviewRanking($filter: RankingFilter!, $first: Int!, $after: Cursor) {
    ranking(filter: $filter, first: $first, after: $after) {
      edges {
        node {
          id
          name
        }
        ...ScoreCell
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

const SCORE_CELL_FRAGMENT = graphql(`
  fragment ScoreCell on RankingEdge {
    ...UserCompletedQuestions
    ...UserTotalPoints
    ...RankingFragment
  }
`);

const USER_COMPLETED_QUESTIONS_FRAGMENT = graphql(`
  fragment UserCompletedQuestions on RankingEdge {
    node {
        id
        submissionStatistics {
          solvedQuestions
        }
    }
  }
`);

const USER_TOTAL_POINTS_FRAGMENT = graphql(`
  fragment UserTotalPoints on RankingEdge {
    node {
      id
      totalPoints
    }
  }
`);

const RANKING_FRAGMENT = graphql(`
  fragment RankingFragment on RankingEdge {
    score
  }
`);

const RANKING_BY_LABELS: Record<RankingBy, string> = {
  [RankingBy.Points]: "積分",
  [RankingBy.CompletedQuestions]: "完成題數",
};

const RANKING_ORDER_LABELS: Record<RankingOrder, string> = {
  [RankingOrder.Asc]: "遞增",
  [RankingOrder.Desc]: "遞減",
};

const RANKING_PERIOD_LABELS: Record<RankingPeriod, string> = {
  [RankingPeriod.Daily]: "今日",
  [RankingPeriod.Weekly]: "本週",
};

export default function OverviewRanking() {
  const PAGE_SIZE = 20;

  const [rankingBy, setRankingBy] = useState<RankingBy>(RankingBy.Points);
  const [rankingOrder, setRankingOrder] = useState<RankingOrder>(
    RankingOrder.Desc,
  );
  const [rankingPeriod, setRankingPeriod] = useState<RankingPeriod>(
    RankingPeriod.Daily,
  );
  const [cursors, setCursors] = useState<string[]>([]);

  const { data } = useSuspenseQuery(OVERVIEW_RANKING_QUERY, {
    variables: {
      filter: { by: rankingBy, order: rankingOrder, period: rankingPeriod },
      first: PAGE_SIZE,
      after: cursors?.[cursors.length - 1],
    },
  });

  const handlePageChange = (direction: "forward" | "backward") => {
    if (direction === "forward" && data.ranking.pageInfo.endCursor) {
      setCursors((prev) => [...prev, data.ranking.pageInfo.endCursor!]);
    } else if (direction === "backward" && cursors.length > 0) {
      setCursors((prev) => prev.slice(0, -1));
    }
  };

  // 當篩選條件改變時，重置 cursors
  const handleFilterChange = () => {
    setCursors([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>使用者排行榜</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 篩選器 */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">排序依據：</span>
              <Select
                value={rankingBy}
                onValueChange={(value: RankingBy) => {
                  setRankingBy(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(RANKING_BY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">排序方向：</span>
              <Select
                value={rankingOrder}
                onValueChange={(value: RankingOrder) => {
                  setRankingOrder(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(RANKING_ORDER_LABELS).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">時間範圍：</span>
              <Select
                value={rankingPeriod}
                onValueChange={(value: RankingPeriod) => {
                  setRankingPeriod(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(RANKING_PERIOD_LABELS).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">排名</TableHead>
                <TableHead>使用者</TableHead>
                <TableHead className="text-right">
                  {rankingBy === RankingBy.Points ? "積分" : "提交次數"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.ranking.edges.length === 0
                ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className={`text-center text-muted-foreground`}
                    >
                      無資料
                    </TableCell>
                  </TableRow>
                )
                : (
                  data.ranking.edges.map((edge, index) => {
                    const rank = index + 1 + cursors.length * PAGE_SIZE;
                    return (
                      <TableRow key={edge.node.id}>
                        <TableCell>
                          {rank <= 3
                            ? (
                              <Badge
                                variant={rank === 1
                                  ? "default"
                                  : rank === 2
                                  ? "secondary"
                                  : "outline"}
                                className="font-bold"
                              >
                                #{rank}
                              </Badge>
                            )
                            : <span className="text-muted-foreground">#{rank}</span>}
                        </TableCell>
                        <TableCell className="font-medium">
                          {edge.node.name}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          <ScoreCell userFragment={edge} rankingBy={rankingBy} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
            </TableBody>
          </Table>

          {/* 分頁 */}
          <DataTablePagination
            totalCount={data.ranking.edges.length}
            hasNextPage={data.ranking.pageInfo.hasNextPage}
            hasPreviousPage={cursors.length > 0}
            onPageChange={handlePageChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreCell(
  { userFragment, rankingBy }: { userFragment: FragmentType<typeof SCORE_CELL_FRAGMENT>; rankingBy: RankingBy },
) {
  const user = useFragment(SCORE_CELL_FRAGMENT, userFragment);

  const components = {
    [RankingBy.Points]: <TotalPoints userFragment={user} />,
    [RankingBy.CompletedQuestions]: <CompletedQuestion userFragment={user} />,
  };

  return (
    <span className="font-semibold">
      {components[rankingBy]}
      {" | "}
      <ScoreDiff userFragment={user} />
    </span>
  );
}

function CompletedQuestion({ userFragment }: { userFragment: FragmentType<typeof USER_COMPLETED_QUESTIONS_FRAGMENT> }) {
  const user = useFragment(USER_COMPLETED_QUESTIONS_FRAGMENT, userFragment);

  return (
    <span className="font-semibold">
      {user.node.submissionStatistics.solvedQuestions}
    </span>
  );
}

function TotalPoints({ userFragment }: { userFragment: FragmentType<typeof USER_TOTAL_POINTS_FRAGMENT> }) {
  const user = useFragment(USER_TOTAL_POINTS_FRAGMENT, userFragment);

  return (
    <span className="font-semibold">
      {user.node.totalPoints}
    </span>
  );
}

function ScoreDiff({ userFragment }: { userFragment: FragmentType<typeof RANKING_FRAGMENT> }) {
  const user = useFragment(RANKING_FRAGMENT, userFragment);
  const absScore = Math.abs(user.score);

  if (user.score > 0) {
    return <span className="text-green-500">+{absScore}</span>;
  } else if (user.score < 0) {
    return <span className="text-red-500">-{absScore}</span>;
  }

  return <span className="text-muted-foreground">沒有變化</span>;
}
