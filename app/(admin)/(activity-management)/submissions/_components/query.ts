import { graphql } from "@/gql";

export const SUBMISSIONS_TABLE_QUERY = graphql(`
  query SubmissionsTable(
    $first: Int
    $after: Cursor
    $last: Int
    $before: Cursor
    $where: SubmissionWhereInput
  ) {
    submissions(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: SUBMITTED_AT, direction: DESC }) {
      edges {
        node {
          id
          submittedCode
          status
          user {
            id
            name
            email
          }
          question {
            id
            title
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
