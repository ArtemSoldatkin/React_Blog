import React, {PureComponent} from 'react'
import { Mutation, MutationFn } from 'react-apollo';
import {ADD_REVIEW} from '../../../queries/review'
import { User } from '../../../types';
import UserAvatar from '../../../components/user-avatar'

interface CmpProps {
    user: User
}
interface CmpStates {
    review: string
}

export default class ReviewForm extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {review: ''}
    }
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>, callback: MutationFn): void => {
        e.preventDefault()
        const {review} = this.state
        if(review.trim().length <= 0 ) return
        callback({variables:{review}})
    }
    private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => this.setState({review: e.target.value})
    render () {
        const {user} = this.props
        const {review} = this.state
        return (
            <Mutation mutation={ADD_REVIEW}
            onCompleted={({ addReview }) => { }}>
                {(addReview, {data, loading, error}) => (
                    <div className="review-form">
                        <UserAvatar user={user} />
                        <form onSubmit={e => this.handleSubmit(e, addReview)}>
                            <textarea value={review} onChange={this.handleChange} />
                            <button type="submit" disabled={review.trim().length <= 0}>Отправить</button>
                        </form>
                    </div>
                )}            
            </Mutation>            
        )
    }
}
