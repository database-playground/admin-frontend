"use client";

import { useUser } from "@/providers/use-user";

export function UserInfo() {
  const { user } = useUser();

  return (
    <section className="flex flex-col items-center gap-1">
      <p>
        您目前登入的帳號是：{user?.name} ({user?.email})
      </p>
      <p>如果這不是您想登入的帳號，請切換 Google 帳號後重新登入</p>
    </section>
  );
}
