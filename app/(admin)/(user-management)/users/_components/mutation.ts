import { graphql } from "@/gql";

export const USER_UPDATE_MUTATION = graphql(`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`);

export const USER_DELETE_MUTATION = graphql(`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`);

export const USER_LOGOUT_DEVICES_MUTATION = graphql(`
  mutation LogoutUserDevices($userID: ID!) {
    logoutUser(userID: $userID)
  }
`);

export const USER_IMPERSONATE_MUTATION = graphql(`
  mutation ImpersonateUser($userID: ID!) {
    impersonateUser(userID: $userID)
  }
`);
