
import { gql } from "@apollo/client";
export const GET_USER_GISTS = gql`
query GetUserGists($search: String = "parallaxisjones") {
  searchQuery @client @export(as: "$search")
  gists: userGists(username: $search) {
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