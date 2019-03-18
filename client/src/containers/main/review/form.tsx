import React, {PureComponent} from 'react'
import { Mutation, MutationFn } from 'react-apollo';
import {ADD_REVIEW} from '../../../queries/review'
import { User, Reviews } from '../../../types';
import UserAvatar from '../../../components/user-avatar'

interface CmpProps {
    user: User
    id: string
    updateReviews: (reviews: Reviews) => void
}
interface CmpStates {
    body: string
}

export default class ReviewForm extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {body: ''}
    }
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>, callback: MutationFn): void => {
        e.preventDefault()
        const {body} = this.state
        const {id} = this.props
        if(body.trim().length <= 0 ) return
        callback({variables:{id, body}})
    }
    private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => this.setState({body: e.target.value})
    render () {
        const {user} = this.props
        const {body} = this.state
        return (
            <Mutation mutation={ADD_REVIEW}
            onCompleted={({ addReview }) => { 
                if(addReview && addReview.reviews) this.props.updateReviews(addReview.reviews)
            }}>
                {(addReview, {data, loading, error}) => (
                    <div className="new-review">
                        <UserAvatar user={user} />
                        <form className="form-review" onSubmit={e => this.handleSubmit(e, addReview)} >
                            <textarea value={body} onChange={this.handleChange} />
                            <button type="submit" disabled={body.trim().length <= 0}>Отправить</button>
                        </form>
                    </div>
                )}            
            </Mutation>            
        )
    }
}
