"use client";

import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "../ui/alert";

export function ErrorAlert() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (!error || !errorDescription) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {getErrorMessage(error, errorDescription)}
      </AlertDescription>
    </Alert>
  );
}

function getErrorMessage(error: string, description?: string | null): string {
  if (description) return description;

  switch (error) {
    case "invalid_request":
      return "登入請求無效，請重試。";
    case "unauthorized":
      return "您沒有權限存取此應用程式。";
    case "access_denied":
      return "登入已取消或拒絕。";
    case "server_error":
      return "伺服器發生錯誤，請稍後再試。";
    case "temporarily_unavailable":
      return "服務暫時無法使用，請稍後再試。";
    case "auth_error":
      return "認證過程中發生錯誤，請重新登入。";
    case "logout_failed":
      return "登出時發生錯誤，但您的本地工作階段已清除。";
    case "forbidden":
      return "您沒有權限存取此應用程式。";
    default:
      return "登入時發生未知錯誤，請重試。";
  }
}
