import { IResolvers } from 'graphql-tools';
import { Gist } from './lib/gist';
import {getRepository} from "typeorm";
import { Favorite } from './db/entities/Favorite';

const resolverMap: IResolvers = {
  Query: {
    getGist(_: void, { gistId }) {
      return Gist.getById(gistId);
    },
    userGists(_: void, { username }) {
      return Gist.getForUser(username);
    },
    getFavorites: (_: void, { username }) => {
      const favRepo = getRepository(Favorite);
      return favRepo.find({ owner: username });
    }
  },
  Mutation: {
    starGist({ gistId }) {
      return Gist.starAdd(gistId);
    },
    unstarGist({ gistId }) {
      return Gist.starRemove(gistId);
    },
    favoriteGist(_: void, { username, gistId }) {
      const favRepo = getRepository(Favorite);
      const favToSave = new Favorite();
      favToSave.gist = gistId;
      favToSave.owner = username;

      return favRepo.save(favToSave);
    },
    unfavoriteGist: async (_: void, { favoriteId }) => {
      const favRepo = getRepository(Favorite);
      const fav = await favRepo.delete(favoriteId);

      return (fav.affected && fav.affected > 0);
    }
  }
};

export default resolverMap;
