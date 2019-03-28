import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo'
import {Review, Reviews} from '../types'

interface T_AddReview {
    addReview: {reviews: Reviews}
}
export class AddReview extends Mutation<T_AddReview>{}
export const ADD_REVIEW = gql`
    mutation AddReview($id: String!, $body: String!) {
        addReview(id: $id, body: $body) {
            success
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

interface T_EditReview {
    editReview: {
      success: boolean
      message: string
      review: Review
    }
} 
export class EditReview extends Mutation<T_EditReview>{}
export const EDIT_REVIEW = gql`
    mutation EditReview($id: String!, $body: String!){
        editReview(id: $id, body: $body ){
            success
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
interface T_RemoveReview {
    removeReview: {
      success: boolean
      message: string     
    }
  }
  

export class RemoveReview extends Mutation<T_RemoveReview>{}
export const REMOVE_REVIEW = gql`
    mutation RemoveReview($id: String!){
        removeReview(id: $id){
            success
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
            success
            message
            votes {userID value}
        }
    }
`


export const ReviewsFR = gql`
fragment Reviews on Article {
    reviews {id}
}
` 