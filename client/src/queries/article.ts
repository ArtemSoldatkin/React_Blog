import gql from 'graphql-tag';

export const GET_ARTICLES = gql`
    query getArticles($user: String, $search: String) {
        getArticles(user: $user, search: $search){
            status
            message
            articles { 
            id, 
            user {id, login, avatar}
            title,
            description, 
            created, 
            isEdited, 
            vote { userID, value } 
            }
        }
    }
`;

export const GET_ARTICLE = gql`
  query GetArticle($id: String!) {    
    getArticle(id:$id) {        
      status
            message
            articles { 
            id, 
            user {id, login, avatar}
            title,
            description, 
            created, 
            isEdited, 
            vote { userID, value } 
            }
    }
  }
`;

export const ADD_ARTICLE = gql`  
    mutation AddArticle($title: String!, $description: String!, $body: String) {
        addArticle(title: $title, description: $description, body: $body) {
            status
            message           
        }
    }   
`;

export const SET_VOTE_ARTICLE = gql`
    mutation SetVoteArticle($id: String!, $vote: Boolean!){
        setVoteArticle(id: $id, vote: $vote) {
            status
            message
            votes {userID value}
        }
    }
`
