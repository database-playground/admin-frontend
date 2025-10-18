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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DeleteScopeSetDropdownTrigger } from "./delete";
import { UpdateScopeSetDropdownTrigger } from "./update";

export interface ScopeSet {
  id: string;
  slug: string;
  description: string;
  scopes: string[];
}

export const columns: ColumnDef<ScopeSet>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const scopeSet = row.original;

      return (
        <StyledLink href={`/scopesets/${scopeSet.id}`}>
          {scopeSet.id}
        </StyledLink>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "權限集名稱",
  },
  {
    accessorKey: "description",
    header: "權限集描述",
  },
  {
    accessorKey: "scopes",
    header: "權限",
    cell: ({ row }) => {
      const scopes = row.original.scopes;

      return (
        <div
          className={`
            max-w-24 truncate overflow-hidden
            sm:max-w-36
            md:max-w-48
            lg:max-w-84
            xl:max-w-96
          `}
        >
          <Tooltip>
            <TooltipTrigger>
              <code>{scopes.join(", ")}</code>
            </TooltipTrigger>

            <TooltipContent side="left">
              總共 {scopes.length} 個權限
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const scopeSet = row.original;

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
            <Link href={`/scopesets/${scopeSet.id}`}>
              <DropdownMenuItem>
                檢視權限集
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(scopeSet.id)}
            >
              複製權限集 ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <UpdateScopeSetDropdownTrigger id={scopeSet.id} />
            <DeleteScopeSetDropdownTrigger id={scopeSet.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
