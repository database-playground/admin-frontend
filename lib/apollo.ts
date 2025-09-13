import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import buildUri from "./build-uri";
import { headers } from "next/headers";

export function makeClient() {
  const httpLink = new HttpLink({
    uri: buildUri("/query"),
    credentials: "include",
  });

  // Create auth link to add authorization header
  const authLink = new SetContextLink(async ({ headers: contextHeaders }, _) => {
    // Get auth token from request headers (set by middleware)
    const headersList = await headers();
    const token = headersList.get("x-auth-token");

    return {
      headers: {
        ...contextHeaders,
        ...(token && { authorization: `Bearer ${token}` }),
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

export const ERROR_NOT_FOUND = "NOT_FOUND";
export const ERROR_UNAUTHORIZED = "UNAUTHORIZED";
export const ERROR_USER_VERIFIED = "USER_VERIFIED";
export const ERROR_NOT_IMPLEMENTED = "NOT_IMPLEMENTED";
