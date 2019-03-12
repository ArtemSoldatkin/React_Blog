import {makeExecutableSchema} from 'graphql-tools'
import {gql} from 'apollo-server-express'

export default makeExecutableSchema({
    typeDefs: gql`
        type User {
            id: String
            login: String
            avatar: String
        }
        type Vote {
            userID: String
            value: Boolean
        }
        type Review {
            id: String
            user: User
            body: String
            votes: [Vote]
            created: String
            isEdited: Boolean
        }
        type Mutation {
            addReview(id: String!, body: String!): ReviewResponse!
            editReview(id: String!, body: String!): ReviewResponse!
            removeReview(id: String!): ReviewResponse!
            setVoteReview(id: String!, value: Boolean!): ReviewVoteResponse!
        }
        type ReviewResponse {
            status: Boolean
            message: String
            reviews: [Review]
        }
        type ReviewVoteResponse {
            status: Boolean
            message: String
            votes: [Vote]
        }
    `})
