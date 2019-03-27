import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo'
import {Article, Articles} from '../types'

interface T_GetArticles {
    getArticles: {articles: Articles}
  }
export  class GetArticles extends Query<T_GetArticles>{}
export const GET_ARTICLES = gql`
fragment ARTICLE on Article {
  id
  user {id, login, avatar}
  title,
  body,
  description, 
  created, 
  isEdited, 
  reviews {id user {id login avatar} body created isEdited votes { userID, value }}        
  votes { userID, value } 
}
query getArticles($user: String) {
  getArticles(user: $user){
    articles { ...ARTICLE }
  }
}
`

interface T_GetArticle {
    getArticle: {article: Article}
  }
export class GetArticle extends Query<T_GetArticle>{}
export const GET_ARTICLE = gql`
  fragment ARTICLE on Article {
    id
    user {id, login, avatar}
    title,
    body,
    description, 
    created, 
    isEdited, 
    reviews {id user {id login avatar} body created isEdited votes { userID, value }}        
    votes { userID, value } 
  }
  query getArticle($id: String!) {
    getArticle(id: $id){
      article { ...ARTICLE }
    }
  }
`

export const ADD_ARTICLE = gql`  
    mutation AddArticle($title: String!, $description: String!, $body: String!) {
        addArticle(title: $title, description: $description, body: $body) {
            success
            message  
            article { 
            id, 
            user {id, login, avatar}
            title,
            description, 
            body,
            reviews {id user {id login avatar} body created isEdited votes { userID, value }}
            created, 
            isEdited, 
            votes { userID, value } 
            }         
        }
    }   
`;



interface T_EditArticle {
    editArticle: {
      success: boolean
      message: string
      article: Article
    }
  }  
export class EditArticle extends Mutation<T_EditArticle>{}
export const EDIT_ARTICLE = gql`
    mutation EditArticle($id: String!, $title: String, $description: String, $body: String){
        editArticle(id: $id, title: $title, description: $description, body: $body ){
            success
            message
            article { 
            id, 
            user {id, login, avatar}
            title,
            description, 
            body,
            reviews {id user {id login avatar} body created isEdited votes { userID, value }}
            created, 
            isEdited, 
            votes { userID, value } 
            }
        }
    }
`

interface T_RemoveArticle {
    removeArticle: {
      success: boolean
      message: string     
    }
  } 
export  class RemoveArticle extends Mutation<T_RemoveArticle>{}
export const REMOVE_ARTICLE = gql`
    mutation RemoveArticle($id: String!){
        removeArticle(id: $id){
            success
            message
        }
    }
`

export const SET_VOTE_ARTICLE = gql`
    mutation SetVoteArticle($id: String!, $vote: Boolean!){
        setVoteArticle(id: $id, vote: $vote) {        
            success
            message
            votes {userID value}
        }
    }
`
