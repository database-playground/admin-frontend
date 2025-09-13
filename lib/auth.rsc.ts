import { redirect } from "next/navigation";
import { getAuthStatus } from "./auth";

export async function redirectIfAuthenticated(): Promise<void> {
    const isAuthenticated = await getAuthStatus();
    if (isAuthenticated.role === 'admin') {
        redirect("/");
    }
}