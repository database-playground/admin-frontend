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

export interface Event {
  id: string;
  user: { id: string; name: string };
  type: string;
  triggeredAt: string;
}

const eventTypeMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  LOGIN: { label: "登入", variant: "default" },
  LOGOUT: { label: "登出", variant: "secondary" },
  SUBMISSION: { label: "提交", variant: "outline" },
  SCORE: { label: "計分", variant: "default" },
  ERROR: { label: "錯誤", variant: "destructive" },
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "id",
    header: "事件 ID",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <StyledLink href={`/events/${event.id}`}>
          {event.id}
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
    accessorKey: "type",
    header: "事件類型",
    cell: ({ row }) => {
      const type = row.original.type;
      const typeInfo = eventTypeMap[type] || { label: type, variant: "outline" as const };
      return <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>;
    },
  },
  {
    accessorKey: "triggeredAt",
    header: "觸發時間",
    cell: ({ row }) => {
      const triggeredAt = new Date(row.original.triggeredAt);
      return <div>{triggeredAt.toLocaleString("zh-tw")}</div>;
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
              <Link href={`/events/${row.original.id}`}>檢視事件詳情</Link>
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
