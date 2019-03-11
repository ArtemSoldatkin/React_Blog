import React, { PureComponent} from 'react'
import {Form, Button} from 'react-bootstrap'
import { Mutation, ApolloConsumer, MutationFn } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import {LOGIN_USER} from '../../queries/user'
import {isString} from '../../types'
import TextFormControl from './text-form-control'
import Registration from './registration'

interface CmpProps {}

interface CmpStates {      
    validated: boolean | undefined
    login: string | undefined
    password: string | undefined
}

export default class Login extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {
            validated: undefined, login: undefined, password: undefined
        }
    }
    private handleSubmit = async(e: React.FormEvent<HTMLFormElement>, callback: MutationFn): Promise<void> => {
        e.preventDefault()        
        const {login, password} = this.state
        if(!isString(login) || !isString(password)) return this.setState({validated: false})
        callback({variables:{login, password}})     
    }    
    render () {
        const { validated} = this.state
        return (
          <ApolloConsumer>
          {client => (
            <Mutation
              mutation={LOGIN_USER}
              onCompleted={({ login }) => { 
                const token = login && login.token ? login.token : null
                const user = login && login.user ? JSON.stringify(login.user) : null
                token && localStorage.setItem('token', token)
                user && localStorage.setItem('user', user)           
                client.writeData({ data: { user } });
              }}
            >
              {(login, { data, loading, error }) => (
                  <div className="login">
                    <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.handleSubmit(e, login)} inline>
                        <TextFormControl type="text" placeholder="Логин..." 
                        loading={loading} onChange={login => this.setState({login})} validated={validated}/>
                        <TextFormControl type="password" placeholder="Пароль..." 
                        loading={loading} onChange={password => this.setState({password})} validated={validated}/>
                        <Button type="submit" disabled={loading}>
                          <FontAwesomeIcon icon={faSignInAlt} /> 
                          <p>Войти</p>
                        </Button>
                    </Form>
                    <Registration />
                  </div> 
                )}
              </Mutation>
            )}
          </ApolloConsumer>
        )
    }   
}
