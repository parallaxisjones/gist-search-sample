import { gql } from '@apollo/client';

export const REMOVE_FAVORITE = gql`
    mutation removeFavorite($favoriteId: String!) {
        unfavoriteGist(
            favoriteId: $favoriteId
        )
    }
`;