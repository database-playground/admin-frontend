import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";

interface LoginFormProps extends React.ComponentProps<"div"> {
  error?: string;
  errorDescription?: string;
  message?: string;
}

export function LoginForm({
  className,
  error,
  errorDescription,
  message,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Display error messages */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {getErrorMessage(error, errorDescription)}
          </AlertDescription>
        </Alert>
      )}

      {/* Display success messages */}
      {message && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            {getSuccessMessage(message)}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">登入管理介面</CardTitle>
          <CardDescription>
            使用具有管理員權限的帳號登入資料庫練功坊。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <a href="/api/auth/login">
                <Button variant="outline" className="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`mr-2 h-4 w-4`}
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  使用 Google 登入
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getErrorMessage(error: string, description?: string): string {
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

function getSuccessMessage(message: string): string {
  switch (message) {
    case "logged_out":
      return "您已成功登出。";
    default:
      return message;
  }
}
