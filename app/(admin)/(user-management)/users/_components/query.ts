import { graphql } from "@/gql";

export const USER_BY_ID_QUERY = graphql(`
  query UserById($id: ID!) {
    user(id: $id) {
      id
      avatar
      createdAt
      email
      name
      updatedAt
      group {
        id
        name
      }
    }
  }
`);

export const GROUP_LIST_QUERY = graphql(`
  query GroupList {
    groups {
      id
      name
    }
  }
`);

export const USERS_TABLE_QUERY = graphql(`
  query UsersTable(
    $after: Cursor
    $before: Cursor
    $first: Int
    $last: Int
    $where: UserWhereInput
  ) {
    users(after: $after, before: $before, first: $first, last: $last, where: $where) {
      totalCount
      edges {
        node {
          id
          avatar
          createdAt
          email
          name
          updatedAt
          group {
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
