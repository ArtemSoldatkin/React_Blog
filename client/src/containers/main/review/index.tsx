import React, {PureComponent} from 'react'
import {User} from '../../../types'
import ReviewCard from './card'
import ReviewForm from './form'
import './style.scss'


interface CmpProps {
    user: User | undefined
}
interface CmpStates {
  
}

export default class Review extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)        
        this.state = { };
    } 
    render () {
        const {user} = this.props
        return (
            <div className="review">
                {user && <ReviewForm user={user}/>}
                <ReviewCard />
            </div>
        )
    }
}
