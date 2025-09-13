import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import buildUri from "./build-uri";

/**
 * Creates an Apollo Client instance that uses the GraphQL proxy API.
 */
export function makeClient() {
  const httpLink = new HttpLink({
    // Use the GraphQL proxy API instead of direct backend access
    uri: "/api/graphql",
    credentials: "include",
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

/**
 * Create an Apollo Client instance that uses the upstream GraphQL API.
 *
 * You should add the token to the headers of the request.
 */
export function makeUpstreamClient({ token }: { token?: string | null }) {
  const httpLink = new HttpLink({
    uri: buildUri("/query"),
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
