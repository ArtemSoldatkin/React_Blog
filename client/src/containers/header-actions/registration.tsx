import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import RegistrationForm from './registration-form';

export const REGISTRY_USER = gql`  
    mutation AddUser($login: String!, $password: String!) {
        addUser(login: $login, password: $password) {
            status
            message
                user {login avatar }
            token
        }
    }   
`;

interface CmpProps {
  loading: boolean
}

export default function Registry({loading}:CmpProps) {
  return (
    <ApolloConsumer>       
      {client => (
        <Mutation
          mutation={REGISTRY_USER}
          onCompleted={({ addUser }) => {              
            localStorage.setItem('token', addUser.token);
            client.writeData({ data: { isLoggedIn: addUser.token ? true : false } });
          }}
        >
          {(addUser, { data, loading, error }) => {
            // this loading state will probably never show, but it's helpful to
            // have for testing
            if (loading) return <p>Loading...</p>;
            if (error) return <p>An error occurred</p>       
            console.log(data)    
            return <RegistrationForm addUser={addUser} />
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  );
}
