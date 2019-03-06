import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import LoginForm from './login-form';

export const LOGIN_USER = gql`  
    mutation login($login: String!, $password: String!) {
      login(login: $login, password: $password) {
        token
      }
   
}
`;

export default function Login() {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={({ login }) => {
            localStorage.setItem('token', login.token);
            client.writeData({ data: { isLoggedIn: login.token ? true : false } });
          }}
        >
          {(login, { data, loading, error }) => {
            // this loading state will probably never show, but it's helpful to
            // have for testing
            if (loading) return <p>Loading...</p>;
            if (error) return <p>An error occurred</p>       
            console.log(data)    
            return <LoginForm login={login} />
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  );
}
