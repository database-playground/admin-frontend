"use client";

import { makeClient } from "@/lib/apollo";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";

// Designed based on https://github.com/apollographql/apollo-client-integrations/issues/21#issuecomment-1545393482
export function ApolloWrapper({ children, token }: React.PropsWithChildren<{ token?: string | null }>) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient({ token })}>
      {children}
    </ApolloNextAppProvider>
  );
}
