import { redirect } from "next/navigation";
import { getAuthStatus } from "./auth";

export async function redirectIfAuthenticated(): Promise<void> {
  let role: string | undefined;

  try {
    const isAuthenticated = await getAuthStatus();
    role = isAuthenticated.role;
  } catch (error) {
    console.error("Error validating auth:", error);
  }

  if (role === "admin") {
    redirect("/");
  }
}
