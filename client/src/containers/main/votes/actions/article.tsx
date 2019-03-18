import React, {memo} from 'react'
import { Mutation,MutationFn } from 'react-apollo';
import {Votes} from '../../../../types'
import {SET_VOTE_ARTICLE} from '../../../../queries/article'
import VoteForm from '../form'

interface CmpProps {
    userID: string | undefined    
    likesCount: string
    dislikesCount: string
    disabled: boolean | undefined
    my: boolean | undefined
    updateVotes: (likes: Votes, dislikes: Votes, my: boolean | undefined) => void
    setVote: (vote: boolean, callback: MutationFn) => void
}

export default memo(({userID, updateVotes, setVote,
    likesCount,
    dislikesCount,
    disabled,
    my
}: CmpProps) => (
    <Mutation mutation={SET_VOTE_ARTICLE}
        onCompleted={({setVoteArticle}) => {                
            const votes: Votes = setVoteArticle && setVoteArticle.votes
            const myVote = votes && votes.find(vote => vote.userID === userID)                
            votes && updateVotes(
                votes ? votes.filter(vote => vote.value) : [],
                votes ? votes.filter(vote => !vote.value): [],
                myVote ? myVote.value : undefined
            )
        }}
    >
        {(setVoteArticle, { data, loading, error }) => {                
            return <VoteForm 
                setVote={(vote) => setVote(vote, setVoteArticle)}
                likesCount={likesCount}
                dislikesCount={dislikesCount}
                disabled={disabled || loading}
                my={my}
                />
        }}
    </Mutation>
))
