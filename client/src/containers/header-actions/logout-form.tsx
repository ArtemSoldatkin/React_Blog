import React,{memo} from 'react'
import {Button} from 'react-bootstrap'
import { ApolloConsumer } from 'react-apollo';

export default function LogoutButton() {
    return (
      <ApolloConsumer>
        {client => (
          <Button
            onClick={() => {
              client.writeData({ data: { isLoggedIn: false } });
              localStorage.clear();
            }}
          >           
            Logout
          </Button>
        )}
      </ApolloConsumer>
    );
  }