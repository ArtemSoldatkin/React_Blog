import {makeExecutableSchema} from 'graphql-tools'
import {gql} from 'apollo-server-express'

export default makeExecutableSchema({
    typeDefs: gql`
        type User {
            id: String
            login: String            
            avatar: String            
        }       
        type Mutation {
            addUser(login: String!, password: String!, avatar: String): UserResponse!
            editUser(avatar: String!): UserOperationsResponse!
            login(login: String!, password: String!): UserResponse!
        }
        type UserResponse {
            status: Boolean
            message: String
            user: User
            token: String
        }
        type UserOperationsResponse {
            status: Boolean
            message: String
            user: User
        }
    `
})
