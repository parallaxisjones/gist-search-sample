import React from 'react';
import { Gist } from './Gist';
import { Link } from "react-router-dom";
interface GistListViewProps {
  gist: Gist;
}

export const GistListView: React.FunctionComponent<GistListViewProps> = function GistListView({ gist: { url, id, files, owner, description } }) {
    return (
        <div className={`gist-${id}`}>
          <p>{description}</p>
          <Link to={`/gist/${id}`}>{url}</Link>
        </div>
      );
}