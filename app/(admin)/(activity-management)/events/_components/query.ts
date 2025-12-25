import { graphql } from "@/gql";

export const EVENTS_TABLE_QUERY = graphql(`
  query EventsTable(
    $after: Cursor
    $before: Cursor
    $first: Int
    $last: Int
    $where: EventWhereInput
  ) {
    events(after: $after, before: $before, first: $first, last: $last, orderBy: { field: TRIGGERED_AT, direction: DESC }, where: $where) {
      totalCount
      edges {
        node {
          id
          triggeredAt
          type
          user {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`);
