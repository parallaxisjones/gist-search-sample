import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GIST_BY_ID } from '../../operations/queries/getGist';
import { Gist } from './Gist';
import { GistFile } from './GistFile';
import { CREATE_FAVORITE } from '../../operations/mutations/createFavorite';

interface GistViewerProps {
  gistId: string;
}

export const GistViewer: React.FunctionComponent<GistViewerProps> = function GistViewer({ gistId }) {
  const {data, error, loading} = useQuery<{ gist: Gist, username: string }>(GET_GIST_BY_ID, { variables: { gistId }});
  const [createFavorite, mutResults] = useMutation<{owner: string, id: string, gist: string}>(CREATE_FAVORITE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
 
  return (
    <div>
      {
      (mutResults.called || mutResults.data?.id ) ? 
        (<button onClick={() => createFavorite({ variables: { username: data?.username, gistId }})}>favorite</button>) :
        (<button onClick={() => createFavorite({ variables: { username: data?.username, gistId }})}>unfavorite</button>)
      }
      
      {data?.gist.files.map(file => <GistFile key={file.filename} file={file} />)}
    </div>
  );
}