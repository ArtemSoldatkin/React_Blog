import React, {memo} from 'react'
import {Votes, User} from '../../../types'
import { Query } from 'react-apollo';
import {IS_LOGGED_IN} from '../../../queries/user'
import Actions from './actions'
import {Link, withRouter,RouteComponentProps} from 'react-router-dom'
import './style.scss'

type PathParamsType = {
    id: string;
  };
  type CmpProps = RouteComponentProps<PathParamsType> & {   
    votes: Votes
    disabled?: boolean   
    actionType: 'article' | 'review'
    id?: string
}

export default withRouter(memo( ({match, votes, disabled, actionType, id}:CmpProps) => (
            <Query query={IS_LOGGED_IN}>
            {({ data }) => {
                const user: User = data && data.user && JSON.parse(data.user)   
                const userID = user && user.id            
                return <Actions id={id ? id : match.params.id} votes={votes} disabled={disabled} userID={userID} actionType={actionType}/>
            }}
            </Query>
        )
  ))