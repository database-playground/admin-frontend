import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { PersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";
import buildUri from "./build-uri";

/**
 * Create an Apollo Client instance that uses the upstream GraphQL API.
 *
 * You should add the token to the headers of the request.
 */
export function makeClient({ token }: { token?: string | null }) {
  const persistedQueryLink = new PersistedQueryLink({ sha256 });
  const httpLink = new HttpLink({
    uri: buildUri("/query"),
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: persistedQueryLink.concat(httpLink),
  });
}
