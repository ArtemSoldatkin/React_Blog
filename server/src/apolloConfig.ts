import {mergeSchemas, makeExecutableSchema} from 'graphql-tools'
import userSchema from  './typeDefs/user'
import articleSchema from './typeDefs/article'
import reviewSchema from './typeDefs/review'
import voteSchema from './typeDefs/vote'
import userResolver from './resolvers/user'
import articleResolver from './resolvers/article'
import reviewResolver from './resolvers/review'

export default mergeSchemas({
    schemas: [
        makeExecutableSchema({
            typeDefs: [userSchema, articleSchema, reviewSchema, voteSchema]
        }) 
    ],
    resolvers: [userResolver, articleResolver, reviewResolver]
})
