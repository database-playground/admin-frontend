"use server";

import { revokeToken } from "@/lib/auth";

export default async function revokeSpecificToken(token: string) {
  await revokeToken(token);
}
