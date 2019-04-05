import { gql } from 'apollo-server-express';

export default gql`
    type User {
        id: String
        login: String
        avatar: String
    }
    extend type Mutation {
        addUser(login: String!, password: String!, avatar: String): UserRes!
        editUser(avatar: String!): UserOpRes!
        login(login: String!, password: String!): UserRes!
    }
    type UserRes {
        success: Boolean
        message: String
        user: User
        token: String
    }
    type UserOpRes {
        success: Boolean
        message: String
        user: User
    }
`;
