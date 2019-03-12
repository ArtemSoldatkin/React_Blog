import {mergeSchemas} from 'graphql-tools'
import userSchema from  './typeDefs/user'
import articleSchema from './typeDefs/article'
import reviewSchema from './typeDefs/review'
import userResolver from './resolvers/user'
import articleResolver from './resolvers/article'
import reviewResolver from './resolvers/review'

export default mergeSchemas({
    schemas: [ userSchema, articleSchema, reviewSchema ],
    resolvers: [userResolver, articleResolver, reviewResolver]
})
