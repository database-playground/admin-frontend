import { graphql } from "@/gql";

export const EVENTS_TABLE_QUERY = graphql(`
  query EventsTable(
    $first: Int
    $after: Cursor
    $last: Int
    $before: Cursor
  ) {
    events(first: $first, after: $after, last: $last, before: $before, orderBy: { field: TRIGGERED_AT, direction: DESC }) {
      edges {
        node {
          id
          user {
            id
            name
          }
          type
          triggeredAt
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
