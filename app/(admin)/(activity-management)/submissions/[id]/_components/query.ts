import { graphql } from "@/gql";

export const SUBMISSION_BY_ID_QUERY = graphql(`
    query SubmissionById($id: ID!) {
      submission(id: $id) {
        id
        user {
          id
          name
        }
        queryResult {
          columns
          rows
          matchAnswer
        }
        question {
            id
        }
        error
        submittedCode
        status
        submittedAt
      }
    }
  `);
