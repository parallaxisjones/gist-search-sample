import React from 'react';
import { CREATE_FAVORITE } from '../../operations/mutations/createFavorite';
import { REMOVE_FAVORITE } from '../../operations/mutations/removeFavorite';
import { File } from "./Gist";
import client from '../../apollo/client';

interface GistFileProps {
    file: File;
    gistId: String;
    username: string;
}

interface GistFileState {
    content?: string;
    gistId?: string;
    favoriteId?: string;
}

class GistFile extends React.Component<GistFileProps, GistFileState> {
    state = {
        content: undefined,
        gistId: undefined,
        favoriteId: undefined
    }
    constructor(props: GistFileProps){
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.createFavorite = this.createFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
    }
    private async fetchData() {
        const response = await fetch(this.props.file.raw_url);
        const text = await response.text();
        this.setState({ content: text });
    }
    private async createFavorite() {
        const result = await client.mutate<{ favoriteGist: {owner: string, id: string, gist: string} }>({ mutation: CREATE_FAVORITE, variables: {
            username: this.props.username,
            gistId: this.props.gistId
         }})
         this.setState({ favoriteId: result?.data?.favoriteGist.id as string })
    }

    private async removeFavorite() {
        client.mutate<boolean>({ mutation: REMOVE_FAVORITE, variables: {
            favoriteId: this.state.favoriteId
         }})

         this.setState({ favoriteId: undefined })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() { 
        const content = this.state.content || "";
        return (
          <div>
            {
            (this.state.favoriteId) ? 
              (<button onClick={() => this.removeFavorite()}>unfavorite</button>) :
              (<button onClick={() => this.createFavorite()}>favorite</button>)
            }
            <h1>{this.props.file.filename}</h1>
            <pre style={{ width: "90vw"}}>{content}</pre>
          </div>
        );
    }
}

export default GistFile;