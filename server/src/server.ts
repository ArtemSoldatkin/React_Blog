import express from 'express'
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import {Req} from './types'
import {secret, dbUrl, port} from './constants'
import apolloConfig from './apolloConfig'

const server = new ApolloServer({
    context: async({ req }: Req) => {
        try {            
            const token = req.headers && req.headers.authorization  
            if (!token) return {userID: null};
            const res = await jwt.verify(token, secret)           
            if (!res) return {userID: null};
            return {userID: (<any>res).id}
        } catch (err) {
            return {userID: null};
        }
    },    
    schema:apolloConfig
})

const app = express();
server.applyMiddleware({ app });

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true });
//mongoose.connection.collections['articles'].drop(() => console.log('droped'))
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${dbUrl}`));

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);
