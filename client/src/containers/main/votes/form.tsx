import React, {memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

interface CmpProps {    
    likesCount: string
    dislikesCount: string
    disabled: boolean
    setVote: (vote: boolean) => void
    my?: boolean
}

export default memo(({setVote, likesCount, dislikesCount, disabled, my}:CmpProps) => (
    <div id="votes">
        <button className={`vote vote__like ${my !== undefined && my && 'vote__like-my'}`} onClick={() => setVote(true)} disabled={disabled}>
            <FontAwesomeIcon icon={faThumbsUp} className="icon"/>
            <p className="text">{likesCount}</p>
        </button>
        <button className={`vote vote__dislike ${my !== undefined && !my && 'vote__dislike-my'}`} onClick={() => setVote(false)}  disabled={disabled}>
            <FontAwesomeIcon icon={faThumbsDown} className="icon"/>
            <p className="text">{dislikesCount}</p>
        </button>
    </div>
))
