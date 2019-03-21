import React, {memo} from 'react'
import { Mutation} from 'react-apollo';
import gql from 'graphql-tag'
import {SET_VOTE_ARTICLE} from '../../../queries/article'
import {SET_VOTE_REVIEW} from '../../../queries/review'
import {Vote, Votes} from '../../../types'
import VoteCard from './card'
import './style.scss'

//---TEmp
const createID = (id: string, type: string) => `${type}:${id}`
const ArticleFragment = gql`
fragment Votes on Articles {
    votes {userID, value}
}            
` 
const ReviewFragment = gql`
fragment Votes on Articles {
    votes {userID, value}
}            
`
interface T_SetVote {
    setVoteReview?: {
        message: string
        status: boolean
        votes: Votes | null
    }
    setVoteArticle?: {
        message: string
        status: boolean
        votes: Votes | null
    }
}

class SetVote extends Mutation<T_SetVote> {}
//---/ TEmp

interface CmpProps {
    id: string
    type: 'Review' | 'Article'
}

export default memo(({id: _id, type}: CmpProps) => (
    <SetVote mutation={type === 'Article' ? SET_VOTE_ARTICLE : SET_VOTE_REVIEW} >
        {(fnc, { data, client}) => {           
            const id = createID(_id, type)
            const fragment = type === 'Article' ? ArticleFragment : ReviewFragment
            const _t = client.readFragment({id, fragment})
            let votes = _t.votes      
            const _type = `setVote${type}`    
            if(_type === 'setVoteReview' || _type === 'setVoteArticle') {
                const p_votes = data && data[_type]
                if(p_votes && p_votes.votes){ 
                    const _votes = p_votes.votes.map((vote: Vote) => ({...vote, __typename:'Vote'}))
                    const _data = { ..._t, votes: _votes };
                    client.writeFragment({id, fragment, data: _data})    
                    votes = _votes       
                }                     
            }                 
            return <VoteCard votes={votes} mtn={fnc} id={_id}/>                       
        }}   
    </SetVote>
))
