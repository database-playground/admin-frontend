import { graphql } from "@/gql";

export const CHEAT_RECORD_BY_ID_QUERY = graphql(`
  query CheatRecordById($id: ID!) {
    cheatRecord(id: $id) {
      id
      cheatedAt
      reason
      resolvedAt
      resolvedReason
      user {
        id
        avatar
        email
        name
      }
    }
  }
`);

export const CHEAT_RECORDS_TABLE_QUERY = graphql(`
  query CheatRecordsTable(
    $after: Cursor
    $before: Cursor
    $first: Int
    $last: Int
    $where: CheatRecordWhereInput
  ) {
    cheatRecords(
      after: $after
      before: $before
      first: $first
      last: $last
      where: $where
    ) {
      totalCount
      edges {
        node {
          id
          cheatedAt
          reason
          resolvedAt
          resolvedReason
          user {
            id
            avatar
            email
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
