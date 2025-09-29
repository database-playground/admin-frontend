"use server";

import { getAuthToken } from "@/lib/auth";
import { ApolloWrapper } from "./use-apollo";

export default async function AuthorizedApolloWrapper({ children }: { children: React.ReactNode }) {
  const token = await getAuthToken();

  return (
    <ApolloWrapper token={token}>
      {children}
    </ApolloWrapper>
  );
}
