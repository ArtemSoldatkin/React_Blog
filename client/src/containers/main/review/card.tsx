import React, {memo, useState, useEffect} from 'react'
import Moment from 'react-moment';
import {Review, InputData} from '../../../types'
import UserAvatar from '../../../components/user-avatar'
import Info from '../../../components/info'
import CustomTextArea from '../../../components/text-area'
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
    if(!review) return <Info type="error" />
    return (
    <div className="review-card">
        <UserAvatar user={review.user} />  
        <div className="review-body">
            <div className="info">
                <p className="login">{review.user.login}</p>
                <div className="date">
                    <p className="date__text">{review.isEdited ? "Отредактирована:" : "Создана:"}</p>
                    <Moment format="DD.MM.YYYY HH:mm" date={Number(review.created)} />
                </div>
            </div>
            {isEditing ? 
                <div className="description">
                    <CustomTextArea onChange={body => setData({...data, body})} initialState={review.body} />
                </div>
                : 
                <p className="description">{review.body}</p>
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
