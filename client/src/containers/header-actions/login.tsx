import React, {memo, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import {Login, LOGIN_USER} from '../../queries/user'
import {isStr, optStr, optBool} from '../../types'
import TextFormControl from '../../components/text-form-control'
import Loading from '../../components/loading'
import ErrorHandler from '../../components/error-handler'
import Registration from './registration'

export default memo(() => {
  const [login, setLogin] = useState<optStr>(undefined)
  const [password, setPassword] = useState<optStr>(undefined)
  const [valid, setValid] = useState<optBool>(undefined)
  const checkVal = () => isStr(login) && isStr(password)
  return (
    <Login mutation={LOGIN_USER} update={(cache, {data}) => {
      if(data && data.login) {
        const {user, token} = data.login
        user && localStorage.setItem('user', JSON.stringify(user))
        token && localStorage.setItem('token', token)
        if(!user || !token) localStorage.clear()
        cache.writeData({data:{user}})
      }
    }}>
    {(mtn, { loading, error}) => (
        <>
          <Loading loading={loading}>
            <form className="h_ac_login"
            onSubmit={e => {
              e.preventDefault()
              checkVal() ? mtn({variables:{login, password}}) : setValid(false)
            }} >
              <TextFormControl type="text" placeholder="Логин..." 
              loading={loading} onChange={val => setLogin(val)} validated={valid}/>
              <TextFormControl type="password" placeholder="Пароль..." 
              loading={loading} onChange={val => setPassword(val)} validated={valid}/>
              <button className="h_ac_login__btn" type="submit" disabled={loading}>
                <FontAwesomeIcon icon={faSignInAlt} /> 
                <p>Войти</p>
              </button>
            </form>
          </Loading>
          <ErrorHandler error={error} />           
          <Registration loading={loading}/>
        </> 
      )}
    </Login>
  )
})
