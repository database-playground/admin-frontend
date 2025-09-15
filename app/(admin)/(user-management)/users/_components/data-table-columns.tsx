import AppAvatar from "@/components/avatar";
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
import { DeleteUserDropdownTrigger } from "./delete";
import { ImpersonateUserDropdownTrigger } from "./impersonate";
import { LogoutUserDevicesDropdownTrigger } from "./logout-devices";
import { UpdateUserDropdownTrigger } from "./update";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  group: { id: string; slug: string };
  createdAt: string;
  updatedAt: string;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <StyledLink href={`/users/${user.id}`}>
          {user.id}
        </StyledLink>
      );
    },
  },
  {
    accessorKey: "name",
    header: "姓名",
  },
  {
    accessorKey: "email",
    header: "Google 帳號",
  },
  {
    accessorKey: "avatar",
    header: "頭貼",
    enableSorting: false,
    cell: ({ row }) => {
      const avatar = row.original.avatar;
      const name = row.original.name;
      return (
        <div className="flex items-center gap-2">
          <AppAvatar src={avatar} name={name} />
        </div>
      );
    },
  },
  {
    accessorKey: "group",
    header: "群組",
    cell: ({ row }) => {
      const group = row.original.group;
      return <StyledLink href={`/groups/${group.id}`}>{group.slug}</StyledLink>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "建立時間",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);
      return <div>{createdAt.toLocaleString("zh-tw")}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "更新時間",
    cell: ({ row }) => {
      const updatedAt = new Date(row.original.updatedAt);
      return <div>{updatedAt.toLocaleString("zh-tw")}</div>;
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
              <Link href={`/users/${row.original.id}`}>檢視使用者</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <UpdateUserDropdownTrigger id={row.original.id} />
            <DeleteUserDropdownTrigger id={row.original.id} />
            <DropdownMenuSeparator />
            <ImpersonateUserDropdownTrigger
              userId={row.original.id}
            />
            <LogoutUserDevicesDropdownTrigger id={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
