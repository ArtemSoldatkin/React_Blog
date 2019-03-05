const {mergeSchemas} = require('graphql-tools')

const userSchema = require('./typeDefs/user')
const articleSchema = require('./typeDefs/article')
const reviewSchema = require('./typeDefs/review')

const userResolver = require('./resolvers/user')
const articleResolver = require('./resolvers/article')
const reviewResolver = require('./resolvers/review')

module.exports = mergeSchemas({
    schemas: [ userSchema, articleSchema, reviewSchema ],
    resolvers: [userResolver, articleResolver, reviewResolver]
});
