export interface File {
    filename: string,
    type: string,
    language: string,
    raw_url: string,
    size: number
}

interface Owner {
    login: string,
    id: string,
    node_id: string,
    avatar_url: string,
    gravatar_id?: string,
    url: string,
    html_url: string,
    followers_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
}

interface GistOpts {
    id: string;
    url: string;
    files: File[],
    owner: Owner
    description?: string;
}

export class Gist {
    public id: string;
    public url: string;
    public owner: Owner;
    public description?: string;
    public files: File[] = [];

    constructor(opts: GistOpts) {
        this.id = opts.id;
        this.url = opts.url;
        this.owner = opts.owner;
        this.files = opts.files;
        this.description = opts.description;
    }
}