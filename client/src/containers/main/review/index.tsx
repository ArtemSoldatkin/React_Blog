import React, {PureComponent} from 'react'
import {User} from '../../../types'
import ReviewCard from './card'
import ReviewForm from './form'
import {Reviews} from '../../../types'
import './style.scss'


interface CmpProps {
    user: User | undefined
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
        const {user, id} = this.props
        const {reviews} = this.state
        return (
            <div className="review">
                {user && <ReviewForm id={id} user={user} updateReviews={this.updateReviews}/>}
                <ReviewCard reviews={reviews}/>
            </div>
        )
    }
}
