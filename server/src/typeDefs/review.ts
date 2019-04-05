import { gql } from 'apollo-server-express';

export default gql`
    type Review {
        id: String
        user: User
        body: String
        votes: [Vote]
        created: String
        isEdited: Boolean
    }
    extend type Mutation {
        addReview(id: String!, body: String!): ReviewRes!
        editReview(id: String!, body: String!): ReviewRes!
        removeReview(id: String!): ReviewRes!
        setVoteReview(id: String!, vote: Boolean!): ReviewVoteRes!
    }
    type ReviewRes {
        success: Boolean
        message: String
        reviews: [Review]
    }
    type ReviewVoteRes {
        success: Boolean
        message: String
        votes: [Vote]
    }
`;
