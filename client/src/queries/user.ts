import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo'
import {User} from '../types'

interface T_IsLoggedIn {user: null | User}
export class IsLoggedIn extends Query<T_IsLoggedIn>{}
export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    user @client(always: true) { 
      id 
      login 
      avatar
    }
  }
`;

export const LOGIN_USER = gql`  
mutation login($login: String!, $password: String!) {
  login(login: $login, password: $password) {
    success
            message
    token
    user { id login avatar }
  }   
}
`;

export const REGISTRY_USER = gql`  
    mutation AddUser($login: String!, $password: String!) {
        addUser(login: $login, password: $password) {
            success
            message
                user {id login avatar }
            token
        }
    }   
`;

export const EDIT_USER = gql`
  mutation EditUser($avatar: String!) {
    editUser(avatar: $avatar) {
      success
      message
      user {id login avatar}
    }
  }
`
