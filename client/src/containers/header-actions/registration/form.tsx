import React, {memo, useState, useEffect} from 'react'
import { MutationFn } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {isStr, optBool, optStr, InputType} from '../../../types'
import TextFormControl from '../../../components/text-form-control'

interface CmpProps {
    addUser: MutationFn
    loading: boolean
}

export default memo(({addUser, loading}:CmpProps) => {
    const [passType, setPassType] = useState<InputType>('password')
    const [valid, setValid] = useState<optBool>(undefined)
    const [login, setLogin] = useState<optStr>(undefined)
    const [password, setPassword] = useState<optStr>(undefined)
    const [rePass, setRePass] = useState<optStr>(undefined)
    const [passEq, setPassEq] = useState<optBool>(undefined)
    useEffect(() => {        
        if(password !== undefined) setPassEq(password === rePass)
    }, [password, rePass])
    const checkVal = () => isStr(login) && isStr(password) && isStr(rePass) && rePass === password
    return (
        <form id="reg_form" className="reg_form" onSubmit={e => {
            e.preventDefault()
            checkVal() ? addUser({ variables: { login, password } }) : setValid(false)                    
        }} >           
            <TextFormControl type="text" placeholder="Логин..." 
                loading={loading} onChange={login => setLogin(login)} validated={valid}
                label="Логин" feedback="Заполните логин"
            />               
            <TextFormControl type={passType} placeholder="Пароль..." 
                loading={loading} onChange={password => setPassword(password)} validated={valid}
                label="Пароль" feedback="Заполните пароль" 
            />
            <TextFormControl type={passType} placeholder="Повторите пароль..." 
                loading={loading} onChange={rePass => setRePass(rePass)} validated={valid} customRule={passEq}
                label="Повторите пароль" feedback="Пароли не совпадают"
            >            
                <button type='button' className="reg_form__btn" onClick={() => setPassType(passType === 'text' ? 'password' : 'text')} disabled={loading}>
                    {passType === 'password' ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> }
                </button>   
            </TextFormControl>               
        </form>
    )
})
