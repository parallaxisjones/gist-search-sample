import { gql } from "@apollo/client";

export const GET_FAVORITE_GISTS = gql`
  query GetUserGists($username: String!) {
    gists: userGists(username: $username) {
      url,
      id
    }
  }
`;
