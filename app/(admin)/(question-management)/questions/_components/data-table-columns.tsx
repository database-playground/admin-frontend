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
import { DeleteQuestionDropdownTrigger } from "./delete";
import { UpdateQuestionDropdownTrigger } from "./update";

export interface Question {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard" | "unspecified";
  referenceAnswer: string;
  visibleScope?: string | null;
  database: { id: string; slug: string }[]; // Keep as array for table display compatibility
}

const difficultyMap = {
  easy: { label: "簡單", variant: "default" as const },
  medium: { label: "中等", variant: "secondary" as const },
  hard: { label: "困難", variant: "destructive" as const },
  unspecified: { label: "未指定", variant: "outline" as const },
};

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const question = row.original;
      return (
        <StyledLink href={`/questions/${question.id}`}>
          {question.id}
        </StyledLink>
      );
    },
  },
  {
    accessorKey: "title",
    header: "題目標題",
    cell: ({ row }) => {
      const question = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="truncate font-medium">{question.title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "分類",
    cell: ({ row }) => {
      const category = row.original.category;
      return <Badge variant="outline">{category}</Badge>;
    },
  },
  {
    accessorKey: "difficulty",
    header: "難度",
    cell: ({ row }) => {
      const difficulty = row.original.difficulty;
      const difficultyInfo = difficultyMap[difficulty];
      return <Badge variant={difficultyInfo.variant}>{difficultyInfo.label}</Badge>;
    },
  },
  {
    accessorKey: "database",
    header: "資料庫",
    cell: ({ row }) => {
      const databases = row.original.database;
      if (!databases.length) return <span className="text-muted-foreground">無</span>;

      // For 1-N relationship, show only the first (and should be only) database
      const database = databases[0];
      return (
        <StyledLink href={`/database/${database.id}`}>
          <Badge variant="secondary" className="text-xs">
            {database.slug}
          </Badge>
        </StyledLink>
      );
    },
  },
  {
    accessorKey: "visibleScope",
    header: "可見範圍",
    cell: ({ row }) => {
      const visibleScope = row.original.visibleScope;
      if (!visibleScope) {
        return <Badge variant="outline" className="text-xs">所有人</Badge>;
      }
      return <Badge variant="secondary" className="text-xs">{visibleScope}</Badge>;
    },
  },
  {
    accessorKey: "description",
    header: "描述",
    cell: ({ row }) => {
      const description = row.original.description;
      return (
        <div className="max-w-[300px]">
          <div className="truncate text-sm text-muted-foreground">
            {description}
          </div>
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
              <Link href={`/questions/${row.original.id}`}>檢視題目</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <UpdateQuestionDropdownTrigger id={row.original.id} />
            <DeleteQuestionDropdownTrigger id={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
