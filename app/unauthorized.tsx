import { redirect } from "next/navigation";

export default async function UnauthorizedPage() {
  redirect("/login");
}
