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
            body: String
            created: String
            isEdited: Boolean
        }
        type Article {
            id: String
            user: User
            title: String
            description: String      
            body: String  
            votes: [Vote]
            reviews: [Review]
            created: String
            isEdited: Boolean
        }
        type Query {
            getArticle(id: String!): ArticleResponse!
            getArticles(user: String): ArticlesResponse!
        }
        type Mutation {
            addArticle(title: String!, description: String!, body: String!): ArticleOperationsResponse!
            editArticle(id: String!, title: String, description: String, body: String): ArticleOperationsResponse!
            removeArticle(id: String!): ArticleOperationsResponse!
            setVoteArticle(id: String!, vote: Boolean!): ArticleVoteResponse!
        }
        type ArticleResponse {
            success: Boolean
            message: String
            article: Article
        }
        type ArticlesResponse {
            success: Boolean
            message: String
            articles: [Article]
        }
        type ArticleOperationsResponse {
            success: Boolean
            message: String
            article: Article
        }
        type ArticleVoteResponse {
            success: Boolean
            message: String
            votes: [Vote]
        }  
    `
})
