const {makeExecutableSchema} = require('graphql-tools')
const {gql} = require('apollo-server-express')

module.exports = makeExecutableSchema({
    typeDefs: gql`
        type User {
            id: ID!
            login: String
            avatar: String
        }
        type Vote {
            userID: String!
            value: Boolean
        }
        type Article {
            id: ID!
            user: User
            title: String
            description: String      
            body: String  
            vote: [Vote]
            #review
            created: String
            isEdited: Boolean
        }
        type Query {
            getArticle(id: String!): ArticleResponse!
            getArticles(search: String, user: String): ArticlesResponse!
            getMyArticles: ArticlesResponse!
        }
        type Mutation {
            addArticle(title: String!, description: String!, body: String): ArticleResponse!
            editArticle(id: String!, title: String, description: String): ArticleResponse!
            removeArticle(id: String!): ArticleResponse!
            setVoteArticle(id: String!, vote: Boolean!): ArticleVoteResponse!
        }
        type ArticleResponse {
            status: Boolean!
            message: String
            articles: Article
        }
        type ArticlesResponse {
            status: Boolean!
            message: String
            articles: [Article]
        }
        type ArticleVoteResponse {
            status: Boolean
            message: String
            votes: [Vote]
        }

    `
})
