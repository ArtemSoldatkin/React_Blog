import React, {PureComponent} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

interface Vote {
    userID: string
    value: boolean
}

interface CmpProps {
    vote: Vote[]
}
interface CmpStates {
    like: number
    dislike: number
}

export default class Votes extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {like: 135, dislike: 281}
    }
    private setLike = (): void => this.setState(s => ({like: s.like + 1}))
    private setDislike = (): void => this.setState(s => ({dislike: s.dislike + 1}))

    
    render (){
        const {vote} = this.props
        const likes = vote ? vote.filter(v => v.value) : []
        const dislikes = vote ? vote.filter(v => !v.value) : []    
        const likesCount = likes.length > 1000 ? '999+' : `${likes.length}`
        const dislikesCount = dislikes.length > 1000 ? '999+' : `${likes.length}`
        return (
            <div className="votes">
                <span className="vote vote-like" onClick={this.setLike}>
                    <FontAwesomeIcon icon={faThumbsUp} className="vote__icon"/>
                    <p className="vote__text">{likesCount}</p>
                </span>
                <span className="vote vote-dislike" onClick={this.setDislike}>
                    <FontAwesomeIcon icon={faThumbsDown} className="vote__icon"/>
                    <p className="vote__text">{dislikesCount}</p>
                </span>
            </div>
        )
    }
}