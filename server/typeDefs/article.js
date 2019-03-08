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
            addArticle(title: String!, description: String!): ArticleResponse!
            editArticle(id: ID!, title: String, description: String): ArticleResponse!
            removeArticle(id: ID!): ArticleResponse!
            setVoteArticle(id: ID!, vote: Boolean!): ArticleResponse!
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
    `
})
