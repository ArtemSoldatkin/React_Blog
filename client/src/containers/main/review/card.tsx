import React, {PureComponent} from 'react'
import {Review, User, NewReview} from '../../../types'
import Votes from '../votes'
import {IS_LOGGED_IN} from '../../../queries/user'
import { Query } from 'react-apollo';
import Actions from '../actions';
import Moment from 'react-moment';
import UserAvatar from '../../../components/user-avatar'

interface CmpProps {
    review: Review 
}
interface CmpStates {
    isEditing: boolean
   // newReview: NewReview
    body: string | undefined
}

export default class ReviewCard extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {isEditing: false, body: undefined}
    }
    private setEdited = (isEditing: boolean) => this.setState({isEditing})
    private setBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({body: e.target.value})
    //private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({body: e.target.value})
    private clear = () => {}
    render () {
        const {review} = this.props
        const { isEditing, body} = this.state
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
                        {isEditing ? <textarea value={body ? body : review.body} onChange={this.setBody}/> : 
                            <div>{review.body}</div>
                        }  
                    </div>
                    <Votes votes={review.votes} disabled actionType="article"/>  
                </div> 
                <Actions id={review.id} typeAction='review' data={{body}} userID= {review.user.id}
                    clear={this.clear}        isEditing={isEditing} setEdited={this.setEdited}/>            
            </div>
        )
    }
}
