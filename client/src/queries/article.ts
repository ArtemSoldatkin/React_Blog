import gql from 'graphql-tag';

export const GET_ARTICLES = gql`
    query getArticles($user: String) {
        getArticles(user: $user){
            status
            message
            articles { 
            id, 
            user {id, login, avatar}
            title,
            description, 
            created, 
            isEdited, 
            votes { userID, value } 
            }
        }
    }
`;

export const GET_ARTICLE = gql`
  query GetArticle($id: String!) {    
    getArticle(id:$id) {        
      status
            message
            article { 
            id, 
            user {id, login, avatar}
            title,
            description, 
            reviews {id user {id login avatar} body created isEdited votes { userID, value }}
            created, 
            isEdited, 
            votes { userID, value } 
            }
    }
  }
`;

export const ADD_ARTICLE = gql`  
    mutation AddArticle($title: String!, $description: String!, $body: String!) {
        addArticle(title: $title, description: $description, body: $body) {
            status
            message           
        }
    }   
`;

export const EDIT_ARTICLE = gql`
    mutation EditArticle($id: String!, $title: String, $description: String, $body: String){
        editArticle(id: $id, title: $title, description: $description, body: $body ){
            status
            message
        }
    }
`

export const REMOVE_ARTICLE = gql`
    mutation RemoveArticle($id: String!){
        removeArticle(id: $id){
            status
            message
        }
    }
`

export const SET_VOTE_ARTICLE = gql`
    mutation SetVoteArticle($id: String!, $vote: Boolean!){
        setVoteArticle(id: $id, vote: $vote) {
            status
            message
            votes {userID value}
        }
    }
`
