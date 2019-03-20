import React, {memo} from 'react'
import { Query, ApolloProvider } from 'react-apollo';
import {IS_LOGGED_IN} from '../../queries/user'
import {IsLoggedIn} from '../../types'
import Login from './login'
import Logout from './logout'
import './style.scss'

export default memo(() => (
  <div id="header_actions">  
    <Query query={IS_LOGGED_IN}>
      {({ data: {user}}) => {   
       // console.log('data1', user)  
          
       // const user: IsLoggedIn = data && data.user && JSON.parse(data.user)  
        return user ? <Logout user={user}/> : <Login /> 
      }}
    </Query>          
  </div>
))
