import React from 'react';
import { useQuery } from '@apollo/client';
import { Gist } from './Gist';
import { GistListView } from './GistListView';
import { GET_SEARCH_STATE } from '../../operations/queries/getSearchQuery';
import { GET_USER_GISTS } from '../../operations/queries/getUserGists';


interface GistListProps {
    username: string;
}

interface ListProps {
  username?: string;
}

const UserList: React.FC<GistListProps> = ({ username }) => {
    const { loading, error, data } = useQuery<{ gists: Gist[] }>(GET_USER_GISTS, {
      variables: {
        search: username
      }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (Array.isArray(data?.gists) && data?.gists.length === 0) {
      return <p>No Gists Found</p>;
    }

    return (
        <div>
            {data!.gists.map((gist) => ( <GistListView key={gist.id} gist={gist} gistId={gist.id} />))}
        </div>
    );
}

export const GistList: React.FunctionComponent<ListProps> = function Gist({ username }) {
    const query = useQuery<{ searchQuery: string }>(GET_SEARCH_STATE);
    return query.data?.searchQuery ? (<UserList username={query.data?.searchQuery} />) : (<span>please search</span>);
}