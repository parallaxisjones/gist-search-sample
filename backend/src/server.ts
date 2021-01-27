require('dotenv').config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
// import dbConnection from './db/connection';

const config = { port: process.env.APP_PORT };
const startServer = async () => {
    // const db = await dbConnection();
    console.log("\n🚀 connected to db")
    const app = express();
    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(7)],
    });
    
    app.use('*', cors());
    app.use(compression());
    server.applyMiddleware({ app, path: '/graphql' });
    const httpServer = createServer(app);
    const onStart = (): void => {
        return console.log(`\n🚀 GraphQL is now running on http://localhost:3000/graphql`);
    };
    
    httpServer.listen(config, onStart);
}


startServer();