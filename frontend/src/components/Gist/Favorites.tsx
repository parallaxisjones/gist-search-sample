import React from 'react';
import { useQuery } from '@apollo/client';
import { Gist } from './Gist';
import { GistListView } from './GistListView';
import { GET_LOGGED_IN_USER } from '../../operations/queries/getLoggedInUser';
import { GET_FAVORITE_GISTS } from '../../operations/queries/getFavorites';

const FavoritesList: React.FC<{ username: string }> = ({ username }) => {
  const { loading, error, data } = useQuery<{ gists: Gist[] }>(GET_FAVORITE_GISTS, { variables: { username }});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (Array.isArray(data?.gists) && data?.gists.length === 0) {
    return <p>No Gists Found</p>;
  }

  return (
      <div>
          {data!.gists.map((gist) => ( <GistListView key={gist.id} gist={gist} />))}
      </div>
  );
}

export const Favorites: React.FC<{}> = () => {
    const { loading, error, data } = useQuery<{ username: string }>(GET_LOGGED_IN_USER);

    if (loading) return <p>Loading...</p>;
    if (error || !data?.username) return <p>Error :(</p>;

    return (<FavoritesList username={data.username} />);
}