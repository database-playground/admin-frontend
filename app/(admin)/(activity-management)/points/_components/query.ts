import { graphql } from "@/gql";

export const POINTS_TABLE_QUERY = graphql(`
  query PointsTable(
    $first: Int
    $after: Cursor
    $last: Int
    $before: Cursor
    $where: PointWhereInput
  ) {
    points(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: GRANTED_AT, direction: DESC }) {
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
