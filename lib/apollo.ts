import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";

/**
 * Creates an Apollo Client instance that uses the GraphQL proxy API.
 * 
 * This implementation follows the Backend for Frontend (BFF) pattern:
 * - All GraphQL requests go through /api/graphql proxy
 * - The proxy automatically handles authentication by adding Authorization headers
 * - Works consistently for both SSR and CSR without exposing tokens to the client
 * - Removes the need for client-side token management
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
