import React, { PureComponent} from 'react'
import {Form} from 'react-bootstrap'
import { Mutation, ApolloConsumer, MutationFn } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import {LOGIN_USER} from '../../queries/user'
import {isString} from '../../types'
import TextFormControl from '../../components/text-form-control'
import Loading from '../../components/loading'
import Info from '../../components/info'
import Registration from './registration'
import {IS_LOGGED_IN} from '../../queries/user'

interface CmpProps {}

interface CmpStates {      
    validated: boolean | undefined
    login: string | undefined
    password: string | undefined
}

export default class Login extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = { validated: undefined, login: undefined, password: undefined }
    }
    private setLogin = (login: string | undefined) => this.setState({login})
    private setPassword = (password: string | undefined) => this.setState({password})
    private handleSubmit = async(e: React.FormEvent<HTMLFormElement>, callback: MutationFn) => {
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
                //localStorage.clear()
                token && localStorage.setItem('token', token)
                user && localStorage.setItem('user', user) 
              //  const data = { user: login.user, __typename: 'User' };          
               // client.writeData({data: {user}});
                login && login.user && client.writeData({data: {user: login.user}})
              }}
            >
              {(login, { data, loading, error }) => (
                  <div className="login">
                    <Loading loading={loading}>
                      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.handleSubmit(e, login)} inline>
                          <TextFormControl type="text" placeholder="Логин..." 
                          loading={loading} onChange={this.setLogin} validated={validated}/>
                          <TextFormControl type="password" placeholder="Пароль..." 
                          loading={loading} onChange={this.setPassword} validated={validated}/>
                          <button className="button_submit" type="submit" disabled={loading}>
                            <FontAwesomeIcon icon={faSignInAlt} /> 
                            <p>Войти</p>
                          </button>
                      </Form>
                    </Loading>
                    {data && data.login? (
                      data.login.status ? 
                      <Info type="success" message={data.login.message}/> : <Info type="error" message={data.login.message}/>
                    ) : (error && <Info type="error" />)}               
                    <Registration loading={loading}/>
                  </div> 
                )}
              </Mutation>
            )}
          </ApolloConsumer>
        )
    }   
}
