import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo'
import {User} from '../types'


interface T_GetUserID {
    user: null | {id: string }
}
export class GetUserID extends Query<T_GetUserID>{}
export const GET_USER_ID = gql`
  {
    user @client {id}
  }
`;

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


interface T_Login {
  login: {
    success: boolean
    message: string
    user: User | null
    token: string | null
  }  
}
export class Login extends Mutation<T_Login>{}
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

interface T_Registry {
  addUser: {
    success: boolean
    message: string
    user: User | null
    token: string | null
  }  
}
export class Registry extends Mutation<T_Registry>{}
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

interface T_EditUser {
  editUser: null | {
    message: string
    success: boolean
    user: User
  }
}
export class EditUser extends Mutation<T_EditUser>{}
export const EDIT_USER = gql`
  mutation EditUser($avatar: String!) {
    editUser(avatar: $avatar) {
      success
      message
      user {id login avatar}
    }
  }
`
