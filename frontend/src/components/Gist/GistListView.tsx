import React from 'react';
import { Gist } from './Gist';
import { Link } from "react-router-dom";
interface GistListViewProps {
  gist?: Gist;
  gistId: string;
}

export const GistListView: React.FunctionComponent<GistListViewProps> = function GistListView({ gist, gistId }) {
    return (
        <div className={`gist gist-${gistId}`}>
          <Link to={`/gist/${gistId}`}>{gist ? gist.url : gistId}</Link>
        </div>
      );
}