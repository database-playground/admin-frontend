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
import { SubmissionStatus } from "@/gql/graphql";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export interface Submission {
  id: string;
  submittedCode: string;
  status: SubmissionStatus;
  user: { id: string; name: string };
}

const statusMap: Record<
  SubmissionStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  [SubmissionStatus.Success]: { label: "成功", variant: "default" },
  [SubmissionStatus.Failed]: { label: "錯誤", variant: "destructive" },
  [SubmissionStatus.Pending]: { label: "處理中", variant: "secondary" },
};

export const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const submission = row.original;
      return (
        <StyledLink href={`/submissions/${submission.id}`}>
          {submission.id}
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
    accessorKey: "status",
    header: "狀態",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusInfo = statusMap[status] || { label: status, variant: "outline" as const };
      return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
    },
  },
  {
    accessorKey: "submittedCode",
    header: "提交程式碼",
    cell: ({ row }) => {
      const code = row.original.submittedCode;
      return (
        <div className="max-w-[400px]">
          <code
            className={`
              relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono
              text-sm font-semibold text-muted-foreground
            `}
          >
            <div className="truncate">
              {code}
            </div>
          </code>
        </div>
      );
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
              <Link href={`/submissions/${row.original.id}`}>檢視提交記錄</Link>
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
