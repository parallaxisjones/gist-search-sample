import { gql } from '@apollo/client';

export const CREATE_FAVORITE = gql`
    mutation createFavorite($username: String!, $gistId: String!) {
        favoriteGist(
            username: $username
            gistId: $gistId
        ) {
            id
            gist
            owner
        }
    }
`;