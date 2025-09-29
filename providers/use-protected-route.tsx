"use server";

import { getAuthStatus, getAuthToken } from "@/lib/auth";
import { forbidden, unauthorized } from "next/navigation";

export default async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = await getAuthToken();
  if (!token) {
    unauthorized();
  }

  const { loggedIn, role } = await getAuthStatus(token);
  if (!loggedIn) {
    unauthorized();
  }
  if (role !== "admin") {
    forbidden();
  }

  return children;
}
