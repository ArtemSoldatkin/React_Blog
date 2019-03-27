import React, {memo, useState, useEffect} from 'react'
import { MutationFn } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {isString} from '../../../types'
import TextFormControl from '../../../components/text-form-control'

interface CmpProps {
    addUser: MutationFn
    loading: boolean
}

const checkVal = (log: string | undefined,pass: string | undefined,rePass: string | undefined) => (isString(log) && isString(pass) && isString(rePass) && rePass === pass)

export default memo(({addUser, loading}:CmpProps) => {
    const [passType, setPassType] = useState<'text' | 'password'>('password')
    const [valid, setValid] = useState<boolean | undefined>(undefined)
    const [log, setLog] = useState<string | undefined>(undefined)
    const [pass, setPass] = useState<string | undefined>(undefined)
    const [rePass, setRePass] = useState<string | undefined>(undefined)
    const [passEq, setPassEq] = useState<boolean | undefined>(undefined)
    useEffect(() => {        
        if(pass !== undefined) setPassEq(pass === rePass)
    }, [pass, rePass])
    return (
        <form id="registryForm" onSubmit={e => {
            e.preventDefault()
            checkVal(log, pass, rePass) ? addUser({ variables: { login: log, password: pass } }) : (
                setValid(false), setPassEq(false)
            )          
        }} >           
            <TextFormControl type="text" placeholder="Логин..." 
                loading={loading} onChange={val => setLog(val)} validated={valid}
                label="Логин" feedback="Заполните логин"
            />               
            <TextFormControl type={passType} placeholder="Пароль..." 
                loading={loading} onChange={val => setPass(val)} validated={valid}
                label="Пароль" feedback="Заполните пароль" 
            />
            <TextFormControl type={passType} placeholder="Повторите пароль..." 
                loading={loading} 
                onChange={val => setRePass(val)} 
                validated={valid} 
                customRule={passEq}
                label="Повторите пароль" 
                feedback="Пароли не совпадают"
            >            
                <button type='button' className="show_password" onClick={() => setPassType(passType === 'text' ? 'password' : 'text')} disabled={loading}>
                    {passType === 'password' ?
                        <FontAwesomeIcon icon={faEye} />
                    :
                        <FontAwesomeIcon icon={faEyeSlash} />
                    }
                </button>   
            </TextFormControl>               
        </form>
    )
})
