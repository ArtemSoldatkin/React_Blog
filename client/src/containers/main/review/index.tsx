import React,{memo} from 'react'
import { Reviews, User } from '../../../types';
import ReviewCard from './card'
import './style.scss'
import {Query, Mutation, MutationFn} from 'react-apollo'
import gql from 'graphql-tag'
import ReviewForm from './form'
//import {ADD_REVIEW} from '../../../queries/review'


//--- TEMP
interface CmpProps {
    articleID: string
    reviews: Reviews
}


const IS_LOGGED_IN = gql`
    query isLoggedIn {
        user @client {id login avatar}
    }   
`
interface T_IsLoggedIn {
    user: User
}
class IsLoggedIn extends Query<T_IsLoggedIn>{}

///-- TEMP

export default memo(({articleID, reviews}:CmpProps) => {   
    //if(!reviews) return <div>WOROROR</div>
    //if(reviews.length <= 0) return <></>
    return (
        <div id="review">   
            <IsLoggedIn query={IS_LOGGED_IN}>
                {({data}) => {
                    const user = data && data.user
                    if(!user) return <></>                   
                    return <ReviewForm user={user} articleID={articleID}/>
                }}               
            </IsLoggedIn>                
            {reviews.length > 0 && reviews.map((review, index) => <ReviewCard key={`${Date.now()}${review.id}${index}`} review={review} articleID={articleID}/>)} 
        </div>
    )
})
