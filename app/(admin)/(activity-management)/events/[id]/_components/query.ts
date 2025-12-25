import { graphql } from "@/gql";

export const EVENT_BY_ID_QUERY = graphql(`
    query EventById($id: ID!) {
      event(id: $id) {
        id
        payload
        triggeredAt
        type
        user {
          id
          name
        }
      }
    }
`);
