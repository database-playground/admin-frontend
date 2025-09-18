import { graphql } from "@/gql";

export const POINT_BY_ID_QUERY = graphql(`
  query PointById($id: ID!) {
    pointGrant(id: $id) {
      id
      user {
        id
        name
      }
      points
      description
      grantedAt
    }
  }
`);
