import React from 'react'
import {Reviews} from '../../../types'
import Votes from '../votes'

interface CmpProps {
    reviews: Reviews   
}

export default ({reviews}: CmpProps) => (
    <div className="reviews">
        {reviews && reviews.map((review, index) => (
            <div key={`${index}${Date.now}`}>
                <div>
                    {review.user.login}
                </div>
                <div>
                    {review.body}
                </div>
                <div>
                    {review.created}
                </div>
                <footer>
                    <Votes votes={review.votes} actionType='review' id={review.id}/>
                </footer>
            </div>
        ))}
    </div>
)