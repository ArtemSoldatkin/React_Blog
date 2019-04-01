import {gql} from 'apollo-server-express'

export default gql` 
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
            getArticle(id: String!): ArticleRes!
            getArticles(user: String): ArticlesRes!
        }
        type Mutation {
            addArticle(title: String!, description: String!, body: String!): ArticleRes!
            editArticle(id: String!, title: String, description: String, body: String): ArticleRes!
            removeArticle(id: String!): ArticleRes!
            setVoteArticle(id: String!, vote: Boolean!): ArticleVoteRes!
        }
        type ArticleRes {
            success: Boolean
            message: String
            article: Article
        }
        type ArticlesRes {
            success: Boolean
            message: String
            articles: [Article]
        }
        type ArticleVoteRes {
            success: Boolean
            message: String
            votes: [Vote]
        }  
`; 
