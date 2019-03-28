import React, {memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { MutationFn} from 'react-apollo';
import {GetUserID, GET_USER_ID} from '../../../queries/user'
import {Votes} from '../../../types'

interface CmpProps {
    votes: Votes
    mtn: MutationFn   
    id: string
}

export default memo(({votes, mtn, id}: CmpProps) => {    
const action = (mtn: MutationFn, vote: boolean, id: string) => mtn({variables:{id, vote}})
const formatVote = (votes: Votes, value: boolean): string => {
    const votesCount = votes.filter(vote => vote.value === value).length
    let formatedVote = String(votesCount)
    if(votesCount > 1000) formatedVote = `${Math.trunc(votesCount)} тыс.`
    if(votesCount > 1000000) formatedVote = `${Math.trunc(votesCount)} млн.`
    return formatedVote
}
return(
    <GetUserID query={GET_USER_ID}>
        {({ data }) => {
            let disabled: boolean = false
            const user = data && data.user && data.user.id             
            if(!user) disabled = true
            const my = votes.find(vote => vote.userID === user)
            return (
                <div className="mn_votes">
                    <button className={`mn_vote mn_vote-like ${my && my.value && 'mn_vote-like_my'}`} onClick={() => action(mtn, true, id)} disabled={disabled}>
                        <FontAwesomeIcon icon={faThumbsUp} className="mn_vote__icon"/>
                        <p className="mn_vote__text">{formatVote(votes, true)}</p>
                    </button>
                    <button className={`mn_vote mn_vote-dislike ${my && !my.value && 'mn_vote-dislike_my'}`} onClick={() => action(mtn, false, id)} disabled={disabled}>
                        <FontAwesomeIcon icon={faThumbsDown} className="mn_vote__icon"/>
                        <p className="mn_vote__text">{formatVote(votes, false)}</p>
                    </button>
                </div>
        )}}
    </GetUserID>    
)})
