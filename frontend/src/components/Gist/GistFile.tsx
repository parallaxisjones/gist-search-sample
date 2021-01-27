import React from 'react';
import getFileContents from '../../hooks/getGistContent';
import { File } from "./Gist";

interface GistFileProps {
    file: File;
}

export const GistFile: React.FunctionComponent<GistFileProps> = function GistFile({ file }) {
    const content = getFileContents(file);

    return (
        <div key={content?.filename} style={{
            border: '1px solid black',
            fontSize: '10px'
        }}>
            <span>{content?.filename}</span>
            <pre>{content?.content}</pre>
        </div>
    )
}