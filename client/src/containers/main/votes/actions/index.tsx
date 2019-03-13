import React, {PureComponent} from 'react'

import {Votes} from '../../../../types'
import { Mutation, MutationFn } from 'react-apollo';
import {SET_VOTE_ARTICLE} from '../../../../queries/article'

import VoteForm from '../form'

import ActionsArticle from './article'
import ActionsReview from './review'

interface CmpProps {
    actionType: 'article' | 'review'
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
    private filteredVotes = (value: boolean): Votes => this.props.votes ? this.props.votes.filter(vote => vote.value === value) : []
    private findMy = (): boolean | undefined => {
        const {votes, userID} = this.props
        const tempVote = votes && votes.find(vote => vote.userID === userID)
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
    private updateVotes = (likes: Votes, dislikes: Votes, my: boolean | undefined) => this.setState({likes, dislikes, my})
    render (){
        const { disabled, userID, actionType } = this.props      
        const {likes, dislikes, my} = this.state      
        return (
            <div>
                {actionType === 'article' ? 
                    <ActionsArticle
                        userID={userID}
                        updateVotes={this.updateVotes}
                        setVote={this.setVote}
                        likesCount={this.stylizedVote(likes.length)}
                        dislikesCount={this.stylizedVote(dislikes.length)}
                        disabled={disabled}
                        my={my}
                    /> 
                : 
                    <ActionsReview 
                    userID={userID}
                    updateVotes={this.updateVotes}
                    setVote={this.setVote}
                    likesCount={this.stylizedVote(likes.length)}
                    dislikesCount={this.stylizedVote(dislikes.length)}
                    disabled={disabled}
                    my={my}
                    />
                }
            </div>
            )
    }
}
