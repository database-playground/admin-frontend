import { graphql } from "@/gql";

export const CHEAT_RECORD_BY_ID_QUERY = graphql(`
  query CheatRecordById($id: ID!) {
    cheatRecord(id: $id) {
      id
      reason
      cheatedAt
      resolvedAt
      resolvedReason
      user {
        id
        name
        email
        avatar
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
          reason
          cheatedAt
          resolvedAt
          resolvedReason
          user {
            id
            name
            email
            avatar
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
