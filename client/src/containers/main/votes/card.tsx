import React, {memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { MutationFn, ApolloConsumer, Query } from 'react-apollo';
import {Votes} from '../../../types'
import gql from 'graphql-tag'

interface CmpProps {
    votes: Votes
    mtn: MutationFn   
    id: string
}

const action = (mtn: MutationFn, vote: boolean, id: string) => mtn({variables:{id, vote}})
const formatVote = (votes: Votes, value: boolean): string => {
    const votesCount = votes.filter(vote => vote.value === value).length
    let formatedVote = String(votesCount)
    if(votesCount > 1000) formatedVote = `${Math.trunc(votesCount)} тыс.`
    if(votesCount > 1000000) formatedVote = `${Math.trunc(votesCount)} млн.`
    return formatedVote
}

const GET_USER_ID = gql`
  {
    user @client {id}
  }
`;

export default memo(({votes, mtn, id}: CmpProps) => (
    <Query query={GET_USER_ID}>
        {({ data }) => {
            let disabled: boolean = false
            const user = data && data.user && data.user.id             
            if(!user) disabled = true
            const my = votes.find(vote => vote.userID === user)

        return (
            <div id="votes">
                <button className={`vote vote__like ${my && my.value && 'vote__like-my'}`} onClick={() => action(mtn, true, id)} disabled={disabled}>
                    <FontAwesomeIcon icon={faThumbsUp} className="icon"/>
                    <p className="text">{formatVote(votes, true)}</p>
                </button>
                <button className={`vote vote__dislike ${my && !my.value && 'vote__dislike-my'}`} onClick={() => action(mtn, false, id)} disabled={disabled}>
                    <FontAwesomeIcon icon={faThumbsDown} className="icon"/>
                    <p className="text">{formatVote(votes, false)}</p>
                </button>
            </div>
        )}}
    </Query>    
))
