const {makeExecutableSchema} = require('graphql-tools')
const {gql} = require('apollo-server-express')

module.exports = makeExecutableSchema({
    typeDefs: gql`
        type User {
            id: String
            login: String            
            avatar: String            
        }       
        type Mutation {
            addUser(login: String!, password: String!, avatar: String): UserResponse!
            editUser(avatar: String): UserResponse!
            login(login: String!, password: String!): UserResponse!
        }
        type UserResponse {
            status: Boolean
            message: String
            user: User
            token: String
        }
    `
})
