
import { gql } from "@apollo/client";
export const GET_GIST_BY_ID = gql`
query GetGistById($gistId: String!) {
  gist: getGist(gistId: $gistId) {
    url,
    id,
    owner {
        login,
        avatar_url
    },
    files { 
        filename,
        type,
        raw_url
    }
  }
}
`;