import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "登入",
};

export default function LoginPage() {
  return (
    <div
      className={`
        flex min-h-svh flex-col items-center justify-center gap-6
        bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6
        md:p-10
      `}
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
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
        <LoginForm />
      </div>
    </div>
  );
}
