import gql from 'graphql-tag';

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
    status
            message
    token
    user { id login avatar }
  }   
}
`;

export const REGISTRY_USER = gql`  
    mutation AddUser($login: String!, $password: String!) {
        addUser(login: $login, password: $password) {
            status
            message
                user {id login avatar }
            token
        }
    }   
`;

export const EDIT_USER = gql`
  mutation EditUser($avatar: String!) {
    editUser(avatar: $avatar) {
      status
      message
      user {id login avatar}
    }
  }
`
