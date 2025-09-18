import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StyledLink } from "@/components/ui/link";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export interface Point {
  id: string;
  user: { id: string; name: string };
  points: number;
  description: string;
  grantedAt: string;
}

export const columns: ColumnDef<Point>[] = [
  {
    accessorKey: "id",
    header: "記錄 ID",
    cell: ({ row }) => {
      const point = row.original;
      return (
        <StyledLink href={`/points/${point.id}`}>
          {point.id}
        </StyledLink>
      );
    },
  },
  {
    accessorKey: "user.id",
    header: "使用者",
    cell: ({ row }) => {
      const userId = row.original.user.id;
      const userName = row.original.user.name;
      return (
        <StyledLink href={`/users/${userId}`}>
          {userName} (#{userId})
        </StyledLink>
      );
    },
  },
  {
    accessorKey: "points",
    header: "積分",
    cell: ({ row }) => {
      const points = row.original.points;
      const isPositive = points >= 0;
      return (
        <Badge variant={isPositive ? "default" : "destructive"}>
          {isPositive ? "+" : ""}
          {points}
        </Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: "描述",
    cell: ({ row }) => {
      const description = row.original.description;
      return (
        <div className="max-w-[300px]">
          <div className="truncate text-sm">
            {description}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "grantedAt",
    header: "獲得時間",
    cell: ({ row }) => {
      const grantedAt = new Date(row.original.grantedAt);
      return <div>{grantedAt.toLocaleString("zh-tw")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">開啟選單</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>動作</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/points/${row.original.id}`}>檢視積分記錄</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/users/${row.original.user.id}`}>檢視使用者</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
