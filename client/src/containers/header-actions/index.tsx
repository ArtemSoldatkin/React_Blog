import React, {memo} from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Login from './login'
import Logout from './logout'
import './style.scss'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client  
    user @client 
  }
`;

export default memo(() => (
    <div className="header-actions">
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {           
            const user = data && data.user && JSON.parse(data.user) 
            const isLoggedIn =  data && data.isLoggedIn         
            return(isLoggedIn && user ? <Logout user={user}/> : <Login /> )
          }}
        </Query>        
    </div>
))
