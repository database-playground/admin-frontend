import AppAvatar from "@/components/avatar";
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
import { ResolveCheatRecordDropdownTrigger } from "./resolve";

export interface CheatRecord {
  id: string;
  reason: string;
  cheatedAt: string;
  resolvedAt?: string | null;
  resolvedReason?: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
  };
}

export const columns: ColumnDef<CheatRecord>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <StyledLink href={`/cheat-records/${record.id}`}>
          {record.id}
        </StyledLink>
      );
    },
  },
  {
    accessorKey: "user",
    header: "使用者",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-2">
          <AppAvatar src={user.avatar} name={user.name} />
          <div>
            <StyledLink href={`/users/${user.id}`}>
              {user.name}
            </StyledLink>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "原因",
    cell: ({ row }) => {
      return <div className="max-w-md truncate">{row.original.reason}</div>;
    },
  },
  {
    accessorKey: "cheatedAt",
    header: "作弊時間",
    cell: ({ row }) => {
      const cheatedAt = new Date(row.original.cheatedAt);
      return <div>{cheatedAt.toLocaleString("zh-TW")}</div>;
    },
  },
  {
    id: "status",
    accessorKey: "resolvedAt",
    header: "狀態",
    cell: ({ row }) => {
      const resolvedAt = row.original.resolvedAt;
      if (resolvedAt) {
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            已解決
          </Badge>
        );
      }
      return <Badge variant="destructive">未解決</Badge>;
    },
  },
  {
    id: "resolvedAtTime",
    accessorKey: "resolvedAt",
    header: "解決時間",
    cell: ({ row }) => {
      const resolvedAt = row.original.resolvedAt;
      if (resolvedAt) {
        return <div>{new Date(resolvedAt).toLocaleString("zh-TW")}</div>;
      }
      return <div className="text-muted-foreground">-</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;
      const isResolved = !!record.resolvedAt;

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
              <Link href={`/cheat-records/${record.id}`}>檢視記錄</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/users/${record.user.id}`}>檢視使用者</Link>
            </DropdownMenuItem>
            {!isResolved && (
              <>
                <DropdownMenuSeparator />
                <ResolveCheatRecordDropdownTrigger id={record.id} />
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
