import React, {PureComponent} from 'react'

import {Votes} from '../../../types'
import { Mutation, MutationFn } from 'react-apollo';
import {SET_VOTE_ARTICLE} from '../../../queries/article'

import VoteForm from './form'


interface CmpProps {
    id: string
    votes: Votes
    disabled?: boolean  
    userID?: string 
}
interface CmpStates {
    likes: Votes
    dislikes: Votes
    my: boolean | undefined
}

export default class ComponentVotes extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {likes: this.filteredVotes(true), dislikes: this.filteredVotes(false), my: this.findMy() }
    } 
    private filteredVotes = (value: boolean): Votes => this.props.votes.filter(vote => vote.value === value)
    private findMy = (): boolean | undefined => {
        const {votes, userID} = this.props
        const tempVote = votes.find(vote => vote.userID === userID)
        return tempVote ? tempVote.value : undefined       
    } 

    private setVote = (vote: boolean, callback: MutationFn): void => {
        const {id} = this.props      
        callback({variables: {id, vote}})
    }
    private stylizedVote = (number: number): string => {
        if(number >= 1000 && number < 1000000) return `${Math.trunc(number / 1000)} тыс.`
        if(number >= 1000000 && number < 1000000000) return `${Math.trunc(number / 1000000)} млн.`
        return `${number}`
    }    
    render (){
        const { disabled, userID } = this.props      
        const {likes, dislikes, my} = this.state      
        return (   
            <Mutation mutation={SET_VOTE_ARTICLE}
            onCompleted={({setVoteArticle}) => {                
                const votes: Votes = setVoteArticle && setVoteArticle.votes
                const myVote = votes && votes.find(vote => vote.userID === userID)                
                votes && this.setState({
                    likes: votes ? votes.filter(vote => vote.value) : [],
                    dislikes: votes ? votes.filter(vote => !vote.value): [],
                    my: myVote ? myVote.value : undefined
                })
             }}>
                {(setVoteArticle, { data, loading, error }) => {                
                    return <VoteForm 
                        setVote={(vote) => this.setVote(vote, setVoteArticle)}
                        likesCount={this.stylizedVote(likes.length)}
                        dislikesCount={this.stylizedVote(dislikes.length)}
                        disabled={disabled || loading}
                        my={my}
                    />
                }}
            </Mutation>
            
                     
        )
    }
}
