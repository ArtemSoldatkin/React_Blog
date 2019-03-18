import gql from 'graphql-tag';

export const ADD_REVIEW = gql`
    mutation AddReview($id: String!, $body: String!) {
        addReview(id: $id, body: $body) {
            status
            message
            reviews {
                id 
                user {id login avatar} 
                body 
                votes{ userID value} 
                created
                isEdited
            }
        }
    }
`
export const EDIT_REVIEW = gql`
    mutation EditReview($id: String!, $body: String!){
        editReview(id: $id, body: $body ){
            status
            message
            reviews {
                id 
                user {id login avatar} 
                body 
                votes{ userID value} 
                created
                isEdited
            }
        }
    }
`

export const REMOVE_REVIEW = gql`
    mutation RemoveReview($id: String!){
        removeReview(id: $id){
            status
            message
            reviews {
                id 
                user {id login avatar} 
                body 
                votes{ userID value} 
                created
                isEdited
            }
        }
    }
`


export const SET_VOTE_REVIEW = gql`
    mutation SetVoteReview($id: String!, $vote: Boolean!){
        setVoteReview(id: $id, vote: $vote) {
            status
            message
            votes {userID value}
        }
    }
`
