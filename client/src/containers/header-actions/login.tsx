import React, { PureComponent} from 'react'
import {Form, Button} from 'react-bootstrap'
import TextFormControl from './text-form-control'
import gql from 'graphql-tag';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import Registration from './registration'
import {isString} from '../../types'

interface CmpProps {}

interface CmpStates {   
    loading: boolean   
    validated: boolean | undefined
    login: string | undefined
    password: string | undefined
}

const LOGIN_USER = gql`  
    mutation login($login: String!, $password: String!) {
      login(login: $login, password: $password) {
        token
        user { id login avatar }
      }   
    }
`;

export default class Login extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {loading: false, 
            validated: undefined, login: undefined, password: undefined
        }
    }
    private handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        e.stopPropagation()        
        const {login, password} = this.state
        if(!isString(login) || !isString(password))return this.setState({validated: false})
        return this.setState({loading: true})       
    }    
    render () {
        const { loading, validated} = this.state
        return (
          <ApolloConsumer>
          {client => (
            <Mutation
              mutation={LOGIN_USER}
              onCompleted={({ login }) => {           
                localStorage.setItem('token', login.token);          
                localStorage.setItem('user', JSON.stringify(login.user))          
                client.writeData({ data: { 
                  isLoggedIn: login.token ? true : false , 
                  user: login.user ? JSON.stringify(login.user) : null
                } });
              }}
            >
              {(login, { data, loading, error }) => (
                  <div className="login">
                    <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                      this.handleSubmit(e)
                      login({ variables: { login: this.state.login, password: this.state.login } })
                    }} inline>
                        <TextFormControl type="text" placeholder="Логин..." 
                        loading={loading} onChange={login => this.setState({login})} validated={validated}/>
                        <TextFormControl type="password" placeholder="Пароль..." 
                        loading={loading} onChange={password => this.setState({password})} validated={validated}/>
                        <Button type="submit" disabled={loading}>
                          <FontAwesomeIcon icon={faSignInAlt} /> 
                          <p>Войти</p>
                        </Button>
                    </Form>
                    <Registration loading={loading}/>
                  </div> 
                )}
              </Mutation>
            )}
          </ApolloConsumer>
        )
    }   
}
