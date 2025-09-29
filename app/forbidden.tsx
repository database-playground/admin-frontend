import ForbiddenLayout from "@/components/forbidden-layout/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "權限不足",
}

export default function ForbiddenPage() {
  return <ForbiddenLayout />;
}