import { graphql } from "@/gql";
import type { BasicUserInfoQuery } from "@/gql/graphql";

export type BasicUserInfo = BasicUserInfoQuery["me"];

export const BASIC_USER_INFO_QUERY = graphql(`
  query BasicUserInfo {
    me {
      id
      name
      email
      avatar

      group {
        name
      }
    }
  }
`);
