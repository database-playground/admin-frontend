import { graphql } from "@/gql";

export const CREATE_CHEAT_RECORD_MUTATION = graphql(`
  mutation CreateCheatRecord($reason: String!, $userID: ID) {
    createCheatRecord(reason: $reason, userID: $userID) {
      id
      cheatedAt
      reason
      user {
        id
        email
        name
      }
    }
  }
`);

export const RESOLVE_CHEAT_RECORD_MUTATION = graphql(`
  mutation ResolveCheatRecord($cheatRecordID: ID!, $reason: String!) {
    resolveCheatRecord(cheatRecordID: $cheatRecordID, reason: $reason)
  }
`);
