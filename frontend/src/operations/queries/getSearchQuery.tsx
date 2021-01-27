import { gql } from "@apollo/client";

export const GET_SEARCH_STATE = gql`
query searchBoxState {
  searchQuery @client
}
`;