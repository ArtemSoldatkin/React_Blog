import React, {memo} from 'react'

import Login from './login'
import Logout from './logout'
import Registration from './registration'
import User from './user' 

import { Query, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default memo(() => (
    <div className="header-actions">
        <Query query={IS_LOGGED_IN}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>ERROR</p>;         
          return (data && data.isLoggedIn  ? <div><User /><Logout /></div> : <div><Login /><Registration /></div>)}
        }
        </Query>        
    </div>
))