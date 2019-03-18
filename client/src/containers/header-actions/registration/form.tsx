import React,{PureComponent} from 'react'
import { MutationFn } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {isString} from '../../../types'
import TextFormControl from '../../../components/text-form-control'

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
    passwordEquals: boolean | undefined
}

export default class Registry extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {passwordType: 'password', 
        validated: undefined, login: undefined, password: undefined, rePassword: undefined, passwordEquals: undefined}
    }    
    private changePasswordType = () => this.setState(({passwordType}) => ({passwordType: passwordType === 'password' ? 'text' : 'password'}))
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()            
        const {login, password, rePassword} = this.state        
        if(!isString(login) || !isString(password) || !isString(rePassword) || rePassword!== password) return this.setState({validated: false, passwordEquals: false})       
        this.props.addUser({ variables: { login, password } })
    } 
    private setLogin = (login : string | undefined) => this.setState({login})
    private setPassword = (password : string | undefined) => this.setState(({rePassword}) => ({password, passwordEquals: password === rePassword}))
    private setRePassword = (rePassword : string | undefined) => this.setState(({password}) => ({rePassword, passwordEquals: password === rePassword}))
    render(){
        const {passwordType, validated, passwordEquals} = this.state        
        const {loading} = this.props      
    return (        
        <form id="registryForm" onSubmit={this.handleSubmit} >
            <TextFormControl type="text" placeholder="Логин..." 
                loading={loading} onChange={this.setLogin} validated={validated}
                label="Логин" feedback="Заполните логин"
            />               
            <TextFormControl type={passwordType} placeholder="Пароль..." 
                loading={loading} onChange={this.setPassword} validated={validated}
                label="Пароль" feedback="Заполните пароль" 
            />
            <TextFormControl type={passwordType} placeholder="Повторите пароль..." 
                loading={loading} 
                onChange={this.setRePassword} 
                validated={validated} 
                customRule={passwordEquals}
                label="Повторите пароль" 
                feedback="Пароли не совпадают"
            >            
                <button type='button' className="show_password" onClick={this.changePasswordType} disabled={loading}>
                    {passwordType === 'password' ?
                        <FontAwesomeIcon icon={faEye} />
                    :
                        <FontAwesomeIcon icon={faEyeSlash} />
                    }
                </button>   
            </TextFormControl>               
        </form>           
    )
}}
