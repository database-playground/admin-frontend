import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { redirectIfAuthenticated } from "@/lib/auth.rsc";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default async function ForbiddenPage({ searchParams }: { searchParams: Promise<{ name?: string; email?: string }> }) {
  await redirectIfAuthenticated();

  const { name, email } = await searchParams;

  return (
    <div
      className={`
        flex min-h-svh flex-col items-center justify-center gap-6
        bg-gradient-to-br from-red-50 via-white to-red-100 p-6
        md:p-10
      `}
    >
      <Link
        href="/"
        className={`flex items-center gap-2 self-center font-medium`}
      >
        <div
          className={`
            flex size-6 items-center justify-center rounded-md
            text-primary-foreground
          `}
        >
          <Logo />
        </div>
        Database Playground
      </Link>
      <Card className="min-w-md">
        <CardHeader className="flex w-full flex-col items-center text-center">
          <AlertTriangle className="mb-2 size-7 text-red-500" />
          <CardTitle className="text-xl">無權開啟此頁面</CardTitle>
          <CardDescription>
            您所在的身分組沒有權限使用這個管理介面。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/login">重新登入</Link>
          </Button>
        </CardContent>
        <CardFooter
          className={`justify-center text-center text-xs text-muted-foreground`}
        >
          <section className="flex flex-col items-center gap-1">
            <p>您目前登入的帳號是：{name} ({email})</p>
            <p>如果這不是您想登入的帳號，請切換 Google 帳號後重新登入</p>
          </section>
        </CardFooter>
      </Card>
    </div>
  );
}
