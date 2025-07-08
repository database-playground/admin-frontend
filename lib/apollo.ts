import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import buildUri from "./build-uri";

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: buildUri("/query"),
        credentials: "include",
    }),
});

export const ERROR_NOT_FOUND = "NOT_FOUND"
export const ERROR_UNAUTHORIZED = "UNAUTHORIZED"
export const ERROR_USER_VERIFIED = "USER_VERIFIED"
export const ERROR_NOT_IMPLEMENTED = "NOT_IMPLEMENTED"
