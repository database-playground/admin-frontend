"use client";

import { BASIC_USER_INFO_QUERY } from "@/lib/user";
import { useSuspenseQuery } from "@apollo/client/react";

export function useUser() {
  const { data } = useSuspenseQuery(BASIC_USER_INFO_QUERY);

  return { user: data?.me };
}
