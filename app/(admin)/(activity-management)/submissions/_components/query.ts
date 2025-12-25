import { graphql } from "@/gql";

export const SUBMISSIONS_TABLE_QUERY = graphql(`
  query SubmissionsTable(
    $after: Cursor
    $before: Cursor
    $first: Int
    $last: Int
    $where: SubmissionWhereInput
  ) {
    submissions(after: $after, before: $before, first: $first, last: $last, orderBy: { field: SUBMITTED_AT, direction: DESC }, where: $where) {
      totalCount
      edges {
        node {
          id
          status
          submittedCode
          question {
            id
            title
          }
          user {
            id
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
