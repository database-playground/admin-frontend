import { redirect } from "next/navigation";
import { getAuthStatus, getAuthToken } from "./auth";

export async function redirectIfAuthenticated(): Promise<void> {
  let role: string | undefined;

  const token = await getAuthToken();
  if (!token) {
    return;
  }

  try {
    const isAuthenticated = await getAuthStatus(token);
    role = isAuthenticated.role;
  } catch (error) {
    console.error("Error validating auth:", error);
  }

  if (role === "admin") {
    redirect("/");
  }
}
