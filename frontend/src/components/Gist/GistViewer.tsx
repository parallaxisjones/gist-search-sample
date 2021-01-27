import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_GIST_BY_ID } from '../../operations/queries/getGist';
import { Gist } from './Gist';
import GistFile from './GistFile';

interface GistViewerProps {
  gistId: string;
}

export const GistViewer: React.FunctionComponent<GistViewerProps> = function GistViewer({ gistId }) {
  const {data, error, loading} = useQuery<{ gist: Gist, username: string }>(GET_GIST_BY_ID, { variables: { gistId }});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
 
  return (
    <div>
      {data?.gist.files.map(file => <GistFile key={file.filename} username={data?.username} file={file} gistId={gistId} />)}
    </div>
  );
}