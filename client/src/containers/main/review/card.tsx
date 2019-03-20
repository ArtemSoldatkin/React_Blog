import React, {memo} from 'react'
import Moment from 'react-moment';
import UserAvatar from '../../../components/user-avatar'
import {Review} from '../../../types'
import VotesForm from '../votes'
interface CmpProps {
    review: Review 
}

export default memo(({review}: CmpProps) => {
    if(!review) return <div>EROOR</div>
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
            <div className="text">
                <div>{review.body}</div>
            </div>
            <VotesForm id={review.id} type="Review" />
        </div>        
    </div>   
)})

