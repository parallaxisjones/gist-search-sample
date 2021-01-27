import { ApolloClient, InMemoryCache, HttpLink, makeVar, gql } from '@apollo/client';
import { Gist } from '../components/Gist/Gist';

export const getUserKey = () => `gister-demo-key`;
export const userIsLoggedIn = (username: string) => {
    return localStorage.getItem(getUserKey()) === username;
}

const uri = 'http://localhost:3000/graphql';
export const usernameVar = makeVar<string>(localStorage.getItem(getUserKey()) || "parallaxisjones");
export const loginVar = makeVar<boolean>(!!localStorage.getItem(getUserKey()));
export const searchQuery = makeVar<string>("");
export const favoritesVar = makeVar<Gist[]>([]);

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                searchQuery: {
                    read() {
                        return searchQuery();
                    }
                },
                isLoggedIn: {
                    read(_, { variables: { username } }: any) {
                        return loginVar();
                    },
                },
                username: {
                    read() {
                        return usernameVar();
                    },
                },
                favorites: {
                    read() {
                        return favoritesVar();
                    },
                }
            }
        }
    }
});
const httpLink = new HttpLink({ uri });

const client = new ApolloClient({
    link: httpLink,
    cache,
    resolvers: {}
});

export default client;
