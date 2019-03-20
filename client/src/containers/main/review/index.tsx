import React,{memo} from 'react'
import { Reviews, User } from '../../../types';
import ReviewCard from './card'
import './style.scss'
import {Query, Mutation, MutationFn} from 'react-apollo'
import gql from 'graphql-tag'
import ReviewForm from './form'
import {ADD_REVIEW} from '../../../queries/review'

const GET_USER_ID = gql`
  {
    user @client {id login avatar}
  }
`;


const fragment = gql`
    fragment reviews on Articles {
        reviews {
            id
            user {id login avatar}
            body
            isEdited
            created            
        }
    }
`
interface CmpProps {
    articleID: string
}


export default memo(({articleID}:CmpProps) => (
    <Mutation mutation={ADD_REVIEW}>
        {(addReview, {data, loading, error, client}) => { 
            const _user = client.readQuery({query: GET_USER_ID})
            const user = _user && _user.user
            const id = `Article:${articleID}`
            const _reviews = client.readFragment({id, fragment})
            let reviews: Reviews | null = _reviews && _reviews.reviews
            if(data && data.addReview && data.addReview.reviews){
                const _data = {..._reviews, reviews: data.addReview.reviews}
                client.writeFragment({id, fragment, data: _data})
                reviews = data.addReview.reviews
            }
            if(!reviews) return <div>WOROROR</div>
            return (
                <div id="review">
                    {user && <ReviewForm articleID={articleID} user={user} loading={loading} mtn={addReview}/>}
                    {reviews.length > 0 && reviews.map((review, index) => <ReviewCard key={`${Date.now()}${review.id}${index}`} review={review}/>)} 
                </div>
            ) 
        }}
    </Mutation>
)) 
