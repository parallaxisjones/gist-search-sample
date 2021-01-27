import { gql } from "@apollo/client";

export const GET_LOGGED_IN_USER = gql`
query getLoggedInUser {
  username @client
}
`;