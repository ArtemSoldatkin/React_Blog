const {makeExecutableSchema, mergeSchemas} = require('graphql-tools')
const {gql} = require('apollo-server-express')

module.exports = makeExecutableSchema({
    typeDefs: gql`
        type Review {
            id: ID!
            #user: User!
            description: String!
            #attitudes: [Attitude]
            created: String!
            isEdited: Boolean!
        }
        type Mutation {
            reviewAdd(title: String!, description: String!): ReviewResponse!
            reviewEdit(id: ID!, description: String!): ReviewResponse!
            reviewRemove(id: ID!): ReviewResponse!
            reviewAttitude(id: ID!, decision: Boolean!): ReviewResponse!
        }
        type ReviewResponse {
            success: Boolean!
            message: String
            reviews: [Review]
        }
    `})
