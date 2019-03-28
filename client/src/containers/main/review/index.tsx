import React,{memo} from 'react'
import {IsLoggedIn, IS_LOGGED_IN} from '../../../queries/user'
import { Reviews } from '../../../types';
import ReviewCard from './card'
import ReviewForm from './form'
import './style.scss'

interface CmpProps {
    articleID: string
    reviews: Reviews
}

export default memo(({articleID, reviews}:CmpProps) => {  
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
