import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USER_GISTS = gql`
  query GetUserGists($username: String!) {
    gists: userGists(username: $username) {
      url,
      id
    }
  }
`;

export default function Gist() {
  const { loading, error, data } = useQuery(GET_USER_GISTS, {
    variables: { username: "parallaxisjones"}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.gists.map(({ url }: { url: any }) => (
    <div key={url}>
      <p>
        {url}
      </p>
    </div>
  ));
}