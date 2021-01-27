import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn($username: string!) {
    isLoggedIn @client @export(as: "username"),
    username(username: $username) @client,
  }
`;