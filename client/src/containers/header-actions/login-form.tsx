import React, { PureComponent} from 'react'
import {Form, Button} from 'react-bootstrap'
import TextFormControl from './text-form-control'
import {isString} from '../../types'

import {MutationFn} from 'react-apollo'


interface CmpProps {
   login: MutationFn
}

interface CmpStates {   
    loading: boolean   
    validated: boolean | undefined
    login: string | undefined
    password: string | undefined
}

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
        this.setState({loading: true})
        this.props.login({ variables: { login, password } })
    }    
    render () {
        const { loading, validated} = this.state
        return (
            <Form onSubmit={this.handleSubmit} inline>
                <TextFormControl type="text" placeholder="Логин..." 
                loading={loading} onChange={login => this.setState({login})} validated={validated}/>
                <TextFormControl type="password" placeholder="Пароль..." 
                loading={loading} onChange={password => this.setState({password})} validated={validated}/>
                <Button type="submit" disabled={loading}>Войти</Button>
            </Form>
        )
    }   
}