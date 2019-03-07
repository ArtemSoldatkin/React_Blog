import React,{PureComponent} from 'react'
import {Button, Modal, FormGroup, FormLabel, Form} from 'react-bootstrap'
import TextFormControl from './text-form-control'
import {isString} from '../../types'
import { MutationFn } from 'react-apollo';

interface CmpProps {
    addUser: MutationFn
}
interface CmpStates {
    show: boolean
    passwordType: 'text' | 'password'
    loading: boolean   
    validated: boolean | undefined
    login: string | undefined
    password: string | undefined
    rePassword: string | undefined
  
}

export default class Registry extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {show: false, passwordType: 'password',loading: false, 
        validated: undefined, login: undefined, password: undefined, rePassword: undefined}
    }
    private handleShow = (): void => this.setState({show: true})  
    private handleClose = (): void => {!this.state.loading && this.setState({show: false}) } 
    private changePasswordType = () => this.setState({passwordType: this.state.passwordType === 'password' ? 'text' : 'password'})

    private handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        e.stopPropagation()        
        const {login, password, rePassword} = this.state        
        if(!isString(login) || !isString(password) || !isString(rePassword) || rePassword!== password)return this.setState({validated: false})
        this.setState({loading: true})
        this.props.addUser({ variables: { login, password } })
    } 

    render(){
        const {show, passwordType, loading, validated, password, rePassword} = this.state        
    return (
        <div className="header-actions-logout">        
            <Button onClick={this.handleShow} variant="link">Регистрация</Button>
            <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose} disabled={loading}>Закрыть</Button>
                <Button type="submit" form="registryForm" disabled={loading}>Зарегистрироваться</Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}}
