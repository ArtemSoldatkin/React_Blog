import React, {memo} from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Login from './login'
import Logout from './logout'
import Registration from './registration'

import './style.scss'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client  
    user @client 
  }
`;

export interface User1 {
  login: string
  avatar: string
}
//объединить logout и login
export default memo(() => (
    <div className="header-actions">
        <Query query={IS_LOGGED_IN}>
        {({ data }) =>{ 
          console.log(data)
          const user = data && JSON.parse(data.user) 
          //if(data && data.user)console.log('data', data.user && JSON.parse(data.user))
          return(
          data && data.isLoggedIn && user ?            
              <Logout user={user}/>
            
            : 
            <Login />
          )}}
        </Query>        
    </div>
))
