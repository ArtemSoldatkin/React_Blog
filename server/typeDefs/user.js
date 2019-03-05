const {makeExecutableSchema} = require('graphql-tools')
const {gql} = require('apollo-server-express')

module.exports = makeExecutableSchema({
    typeDefs: gql`
        type User {
            login: String            
            avatar: String            
        }
        type Mutation {
            addUser(login: String!, password: String!, avatar: String): UserResponse!
            editUser(login: String, password: String, avatar: String): UserResponse!
            login(login: String!, password: String!): UserResponse!
        }
        type UserResponse {
            status: Boolean
            massage: String
            user: User
            token: String
        }
    `
})
