"use client";

import { useUser } from "@/providers/use-user";

export function Header() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">哈囉，{user.name}！</h2>
        <p className="text-muted-foreground">
          這裡可以快速總覽所有統計資料，也可以點選左邊的側邊來進行資料管理。
        </p>
      </div>
    </div>
  );
}
