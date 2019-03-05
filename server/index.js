const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const User = require('./models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = 'supersecretblogphrase'

const apolloConfig = require('./apolloConfig')
const server = new ApolloServer({
    context: async ({ req }) => {
        try {
            //const token = req.headers["x-access-token"];
            const token = req.headers && req.headers.authorization  
            //console.log('token', token)   
            if (!token) return {userID: null};
            const res = await jwt.verify(token, secret);
            //console.log('res', res)
            if (!res) return {userID: null};
            return {userID: res.id}
        } catch (err) {
            return {userID: null};
        }
    },
    schema:apolloConfig
})

const app = express();
server.applyMiddleware({ app });

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/blog';
mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));



app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
