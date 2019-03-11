import React, {memo} from 'react'
import { Query } from 'react-apollo';
import Login from './login'
import Logout from './logout'
import {IS_LOGGED_IN} from '../../queries/user'
import {User} from '../../types'
import './style.scss'

export default memo(() => (
    <div className="header-actions">
      <Query query={IS_LOGGED_IN}>
        {({ data }) => {   
          const user: User | undefined = data && data.user && JSON.parse(data.user)  
          return (user ? <Logout user={user}/> : <Login /> )
        }}
      </Query>        
    </div>
))
