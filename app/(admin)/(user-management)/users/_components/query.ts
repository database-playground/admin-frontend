import { graphql } from "@/gql";

export const USER_BY_ID_QUERY = graphql(`
  query UserById($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
      createdAt
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
    $first: Int
    $after: Cursor
    $last: Int
    $before: Cursor
    $where: UserWhereInput
  ) {
    users(first: $first, after: $after, last: $last, before: $before, where: $where) {
      edges {
        node {
          id
          name
          email
          avatar
          createdAt
          updatedAt
          group {
            id
            name
          }
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
