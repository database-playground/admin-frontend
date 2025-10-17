"use client";

import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ERROR_FORBIDDEN,
  ERROR_INVALID_INPUT,
  ERROR_NOT_FOUND,
  ERROR_NOT_IMPLEMENTED,
  ERROR_UNAUTHORIZED,
} from "@/lib/apollo-errors";
import { CombinedGraphQLErrors, CombinedProtocolErrors } from "@apollo/client";
import { AlertCircle, Bug, Code, Home, Lock, type LucideIcon, Search, Shield } from "lucide-react";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

type ErrorCommonInfo = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ErrorActionInfo = {
  actionName: string;
  actionHref: string;
};

type ErrorInfo = ErrorCommonInfo & (ErrorActionInfo | { actionName?: undefined; actionHref?: undefined });

function getErrorInfo(error: Error): ErrorInfo {
  // GraphQL errors with codes
  if (CombinedGraphQLErrors.is(error)) {
    const graphQLErrors = error.errors;

    if (graphQLErrors && graphQLErrors.length > 0) {
      const firstError = graphQLErrors[0];
      const errorCode = firstError.extensions?.code as string;

      switch (errorCode) {
        case ERROR_NOT_FOUND:
          return {
            title: "找不到資料",
            description: "請求的資料不存在或已被刪除。",
            icon: Search,
          };
        case ERROR_UNAUTHORIZED:
          return {
            title: "未經授權",
            description: "請登入後再試，或您的權限不足。",
            icon: Lock,
            actionName: "重新登入",
            actionHref: "/login",
          };
        case ERROR_FORBIDDEN:
          const missingScopes = firstError.message.replace(/^no sufficient scope: /, "");
          return {
            title: "權限不足",
            description: "您的帳號缺少權限，請聯絡管理員開通權限後重新登入：" + missingScopes,
            icon: Shield,
            actionName: "重新登入",
            actionHref: "/login",
          };
        case ERROR_NOT_IMPLEMENTED:
          return {
            title: "功能未實作",
            description: "此功能目前尚未實作，請稍後再試。",
            icon: Code,
          };
        case ERROR_INVALID_INPUT:
          return {
            title: "輸入無效",
            description: "請聯絡開發者檢查 API 的輸入資料。",
            icon: Bug,
          };
      }

      return {
        title: "GraphQL 查詢錯誤",
        description: firstError.message || "GraphQL 查詢發生錯誤。",
        icon: AlertCircle,
      };
    }
  }

  // Regular JavaScript errors
  return {
    title: "應用程式發生錯誤",
    description: error.message || "應用程式遇到預期外的錯誤。",
    icon: AlertCircle,
  };
}

export default function GlobalError({ error }: GlobalErrorProps) {
  const errorInfo = getErrorInfo(error);

  return (
    <html>
      <body>
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

          <Card className="max-w-2xl min-w-md">
            <CardHeader
              className={`flex w-full flex-col items-center text-center`}
            >
              <errorInfo.icon className="mb-2 size-7 text-red-500" />
              <CardTitle className="text-xl">{errorInfo.title}</CardTitle>
              <CardDescription>{errorInfo.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-4">
              <div className="w-full rounded-md bg-red-50 p-4 text-left">
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium text-red-800">
                    錯誤詳細資訊
                  </summary>
                  <div className="mt-2 space-y-2 text-red-700">
                    <p className="font-medium">
                      {error.name}: {error.message}
                    </p>

                    {error.stack && (
                      <pre
                        className={`
                          overflow-x-auto rounded bg-red-100 p-2 text-xs
                          whitespace-pre-wrap
                        `}
                      >
                        {error.stack}
                      </pre>
                    )}

                    {CombinedProtocolErrors.is(error) && (
                      <div className="space-y-2">
                        {error.errors && (
                          <div>
                            <Badge
                              variant="destructive"
                              className={`mb-1 text-xs`}
                            >
                              Network Error
                            </Badge>
                            <pre
                              className={`
                                rounded bg-red-100 p-2 text-xs
                                whitespace-pre-wrap
                              `}
                            >
                              {JSON.stringify(error.errors, null, 2)}
                            </pre>
                          </div>
                        )}

                        {error.errors
                          && error.errors.length > 0 && (
                          <div>
                            <Badge
                              variant="destructive"
                              className={`mb-1 text-xs`}
                            >
                              GraphQL Errors ({error.errors.length})
                            </Badge>
                            <pre
                              className={`
                                rounded bg-red-100 p-2 text-xs
                                whitespace-pre-wrap
                              `}
                            >
                                {JSON.stringify(error.errors, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </details>
              </div>

              <div
                className={`
                  flex flex-col gap-3
                  sm:flex-row
                `}
              >
                {errorInfo.actionHref
                  ? (
                    <Button
                      asChild
                      variant="outline"
                      className={`flex items-center gap-2`}
                    >
                      <Link href={errorInfo.actionHref}>{errorInfo.actionName}</Link>
                    </Button>
                  )
                  : (
                    <Button
                      asChild
                      variant="outline"
                      className={`flex items-center gap-2`}
                    >
                      <Link href="/">
                        <Home className="size-4" />
                        回到首頁
                      </Link>
                    </Button>
                  )}
              </div>
            </CardContent>

            <CardFooter
              className={`
                justify-center text-center text-xs text-muted-foreground
              `}
            >
              <section className="flex flex-col items-center gap-1">
                <p>如果問題持續發生，請聯絡開發者進行處理。</p>
                <p className="text-red-600">
                  錯誤時間：
                  {new Date().toLocaleString("zh-TW", {
                    timeZone: "Asia/Taipei",
                  })}
                </p>
              </section>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  );
}
