import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo'
import {Article, Articles} from '../types'

const articleFR = gql`
  fragment ARTICLE on Article {
  id
  __typename
  user {id, login, avatar}
  title,
  body,
  description, 
  created, 
  isEdited, 
  reviews {id user {id login avatar} body created isEdited votes { userID, value }}        
  votes { userID, value } 
}
` 

interface T_GetArticle {
  getArticle: {article: Article}
}
export class GetArticle extends Query<T_GetArticle>{}
export const GET_ARTICLE = gql`  
query getArticle($id: String!) {
  getArticle(id: $id){
    success
    message
    article { ...ARTICLE }
  }
}
${articleFR}
`

interface T_GetArticles {
    getArticles: {articles: Articles}
  }
export  class GetArticles extends Query<T_GetArticles>{}
export const GET_ARTICLES =gql`
  query getArticles($user: String) {
    getArticles(user: $user){
      success
      message
      articles { ...ARTICLE }   
    }
  }
  ${articleFR}
`

interface T_AddArticle {
  addArticle: {
      message: string
      success: string
  }   
}
export class AddArticle extends Mutation<T_AddArticle>{}
export const ADD_ARTICLE = gql`  
    mutation AddArticle($title: String!, $description: String!, $body: String!) {
      addArticle(title: $title, description: $description, body: $body) {
        success
        message
        article { ...ARTICLE }
      }
    }
    ${articleFR} 
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
        article { ...ARTICLE }
      }
    }
    ${articleFR} 
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
        article { ...ARTICLE }
      }
    }
    ${articleFR}
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
