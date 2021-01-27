import fetch from 'node-fetch';

interface File {
    filename: string,
    type: string,
    language: string,
    raw_url: string,
    size: number
}

interface Files {
    [key: string] : File
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
interface GistResponse {
    url: string;
    forks_url: string;
    commits_url: string;
    id: string;
    node_id: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    files: Files;
    public: boolean;
    created_at: string;
    updated_at: string;
    description: string;
    comments: number;
    user?: any;
    comments_url: string;
    owner: Owner;
    truncated: boolean;
}
interface ApiOptions {
    headers: { 
        'accept': string 
    }
}

type QueryArgs = { [key: string]: string | number | undefined };

interface GistAPiOpts extends QueryArgs {
    since?: string;
    per_page?: number;
    page?: number;
}


class ApiClient {
    static host: string = 'https://api.github.com';
    static options: ApiOptions = {
        headers: {
            'accept': 'application/vnd.github.v3+json'
        }
    }
    static async get(endpoint: string, options?: ApiOptions) {
        const url = `${ApiClient.host}/${endpoint}`;
        const opts = { ...ApiClient.options, ...options };
        const response = fetch(url, opts);
        return (await response).json();
    }
    static async put(endpoint: string, options?: ApiOptions) {
        const url = `${ApiClient.host}/${endpoint}`;
        const opts = { ...ApiClient.options, ...options, method: "PUT", headers: {
            ...ApiClient.options.headers,
            "Content-Length": "0"
        } };
        const response = fetch(url, opts);
        return (await response).json();
    }

    static async del(endpoint: string, options?: ApiOptions) {
        const url = `${ApiClient.host}/${endpoint}`;
        const opts = { ...ApiClient.options, ...options, method: "DELETE" };
        const response = fetch(url, opts);
        return (await response).json();
    }

    static toQueryString(query: QueryArgs = {}) {
        const params = Object.keys(query).map(key => key + '=' + query[key]).join('&');

        return params.length > 0 ? `?${params}` : '';
    }
}

export class Gist {
    url: string;
    created_at: string;
    id: string;
    files: File[] = [];
    html_url: string;
    owner: Owner;
    constructor(data: GistResponse) {
        this.url = data.url;
        this.id = data.id;
        this.created_at = data.created_at;
        this.html_url = data.html_url;
        this.owner = data.owner;
        console.log(data);
        this.files = Object.values(data.files);
    }
    static toGist(gist: GistResponse){ return new Gist(gist) };

    private static makeUrl({url, options}: {
        url: String,
        options: GistAPiOpts
    }) {
        return `${url}${ApiClient.toQueryString(options)}`;
    }

    private static async get(url: string, options: GistAPiOpts = {}) {
        return ApiClient.get(Gist.makeUrl({url, options}));
    }

    private static async put(url: string, options: GistAPiOpts = {}) {
        return ApiClient.put(Gist.makeUrl({url, options}));
    }

    private static async del(url: string, options: GistAPiOpts = {}) {
        return ApiClient.del(Gist.makeUrl({url, options}));
    }

    public static async getPublic(options?: GistAPiOpts) {
        return Gist.get(`gists/public`, options);
    }

    public static async getForUser(username: string, options?: GistAPiOpts) {
        const response = await Gist.get(`users/${username}/gists`, options);
        return (response || []).map(Gist.toGist) as Gist[];
    }

    public static async getById(gistId: string, options?: GistAPiOpts) {
        const response = await Gist.get( `gists/${gistId}`, options);
        return Gist.toGist(response);
    }
    public static async starCheck(gistId: string, options?: GistAPiOpts) {
        return Gist.get( `gists/${gistId}/star`, options);
    }
    public static async starRemove(gistId: string, options?: GistAPiOpts) {
        return Gist.del( `gists/${gistId}`, options);
    }
    public static async starAdd(gistId: string, options?: GistAPiOpts) {
        return Gist.put( `gists/${gistId}`, options);
    }
}