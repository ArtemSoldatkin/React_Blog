import React,{PureComponent} from 'react'
import {Button, FormGroup, FormLabel, Form} from 'react-bootstrap'
import { MutationFn } from 'react-apollo';
import {isString} from '../../../types'
import TextFormControl from '../text-form-control'

interface CmpProps {
    addUser: MutationFn
    loading: boolean
}
interface CmpStates {    
    passwordType: 'text' | 'password'    
    validated: boolean | undefined
    login: string | undefined
    password: string | undefined
    rePassword: string | undefined  
}

export default class Registry extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {passwordType: 'password', 
        validated: undefined, login: undefined, password: undefined, rePassword: undefined}
    }    
    private changePasswordType = () => this.setState(({passwordType}) => ({passwordType: passwordType === 'password' ? 'text' : 'password'}))
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()            
        const {login, password, rePassword} = this.state        
        if(!isString(login) || !isString(password) || !isString(rePassword) || rePassword!== password) return this.setState({validated: false})       
        this.props.addUser({ variables: { login, password } })
    } 

    render(){
        const {passwordType, validated, password, rePassword} = this.state        
        const {loading} = this.props
    return (        
        <Form id="registryForm" onSubmit={this.handleSubmit} >
            <FormGroup>
                <FormLabel>Логин</FormLabel>
                <TextFormControl type="text" placeholder="Логин..." 
                loading={loading} onChange={login => this.setState({login})} validated={validated}/>
                <Form.Control.Feedback type="invalid">Заполните логин</Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
                <FormLabel>Пароль</FormLabel>
                <TextFormControl type={passwordType} placeholder="Пароль..." 
                loading={loading} onChange={password => this.setState({password})} validated={validated}/>
                <Form.Control.Feedback type="invalid">Заполните пароль</Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
                <FormLabel>Повторите пароль</FormLabel>
                <TextFormControl type={passwordType} placeholder="Повторите пароль..." 
                loading={loading} onChange={rePassword => this.setState({rePassword})} validated={validated} customRules={() => password === rePassword}/>                        
                <Form.Control.Feedback type="invalid">Пароли не совпадают</Form.Control.Feedback>
            </FormGroup>
            <Button onClick={this.changePasswordType} disabled={loading}>Показать пароль</Button>                  
        </Form>           
    )
}}
