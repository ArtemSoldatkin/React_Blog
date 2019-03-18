import React, {PureComponent} from 'react'
import {User} from '../../../types'
import ReviewCard from './card'
import ReviewForm from './form'
import {Reviews} from '../../../types'
import './style.scss'
import {IS_LOGGED_IN} from '../../../queries/user'
import { Query } from 'react-apollo';

interface CmpProps {
   // user: User | undefined
    reviews: Reviews
    id: string
}
interface CmpStates {
    reviews: Reviews
}

export default class Review extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)        
        this.state = { reviews: this.props.reviews };
    } 
    private updateReviews = (reviews: Reviews) => this.setState({reviews})
    render () {
        const { id} = this.props
        const {reviews} = this.state
        return (
            <div id="review">
            <Query query={IS_LOGGED_IN}>
            {({ data: {user} }) => {   
              //const user: User | undefined = data && data.user && JSON.parse(data.user)
              if(!user) return <div></div>
              return <ReviewForm id={id} user={user} updateReviews={this.updateReviews}/>
            }}
            </Query>
                {reviews && reviews.map((review, index) => <ReviewCard key={`${Date.now()}${review.id}${index}`} review={review}/>)}               
            </div>
        )
    }
}
