import React, {memo, useState, useEffect} from 'react'
import {Review, InputData} from '../../../types'
import UserAvatar from '../../../components/user-avatar'
import CustomTextArea from '../../../components/textarea'
import CreatedDate from '../../../components/created-date'
import VotesForm from '../votes'
import ReviewActions from '../actions'

interface CmpProps {
    review: Review 
    articleID: string
}

export default memo(({review, articleID}: CmpProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [data, setData] = useState<InputData>({})
    useEffect(() => {
        if(isEditing) setData({body: review.body})    
    },[isEditing])     
    return (
    <div className="review_card">
        <UserAvatar user={review.user} />  
        <div className="review_card__body">
            <div className="review_card__info">
                <p className="review_card__log">{review.user.login}</p>
                <CreatedDate isEdited={review.isEdited} created={review.created} />
            </div>
            {isEditing ? 
                <div className="review_card__descr">
                    <CustomTextArea onChange={body => setData({...data, body})} initialState={review.body} />
                </div>
                : 
                <div className="review_card__descr">{review.body}</div>
            } 
            <VotesForm id={review.id} type="Review" votes={review.votes} />
        </div>   
        <ReviewActions 
        id={review.id} 
        type="Review" 
        userID={review.user.id}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        inputData={data}
        articleID={articleID}
        />     
    </div>   
)})
