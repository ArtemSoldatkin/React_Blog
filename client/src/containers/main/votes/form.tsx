import React, {memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

interface CmpProps {
    setVote: (vote: boolean) => void
    likesCount: string
    dislikesCount: string
    disabled: boolean
    my?: boolean
}

export default memo(({setVote, likesCount, dislikesCount, disabled, my}:CmpProps) => (
    <div className="votes">
        <button className={`vote vote-like ${my !== undefined && my && 'vote-like-my'}`} onClick={() => setVote(true)} disabled={disabled}>
            <FontAwesomeIcon icon={faThumbsUp} className="vote__icon"/>
            <p className="vote__text">{likesCount}</p>
        </button>
        <button className={`vote vote-dislike ${my !== undefined && !my && 'vote-dislike-my'}`} onClick={() => setVote(false)}  disabled={disabled}>
            <FontAwesomeIcon icon={faThumbsDown} className="vote__icon"/>
            <p className="vote__text">{dislikesCount}</p>
        </button>
    </div>
))
