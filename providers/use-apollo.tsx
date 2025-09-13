"use client";

import { makeClient } from "@/lib/apollo";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
