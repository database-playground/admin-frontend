import { graphql } from "@/gql";

export const POINTS_TABLE_QUERY = graphql(`
  query PointsTable(
    $first: Int
    $after: Cursor
    $last: Int
    $before: Cursor
  ) {
    points(first: $first, after: $after, last: $last, before: $before, orderBy: { field: GRANTED_AT, direction: DESC }) {
      edges {
        node {
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
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`);
