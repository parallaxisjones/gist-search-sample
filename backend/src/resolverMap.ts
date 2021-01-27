import { IResolvers } from 'graphql-tools';
import { Gist } from './lib/gist';

const resolverMap: IResolvers = {
  Query: {
    getGist(_: void, { gistId }) {
      return Gist.getById(gistId);
    },
    userGists(_: void, { username }) {
      return Gist.getForUser(username);
    },
  },
  Mutation: {
    starGist({ gistId }) {
      return Gist.starAdd(gistId);
    },
    unstarGist({ gistId }) {
      return Gist.starRemove(gistId);
    }
  }
};

export default resolverMap;
