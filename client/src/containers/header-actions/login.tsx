import React, {memo, useState} from 'react'
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import {LOGIN_USER} from '../../queries/user'
import {isString} from '../../types'
import TextFormControl from '../../components/text-form-control'
import Loading from '../../components/loading'
import ErrorHandler from '../../components/error-handler'
import Registration from './registration'

const checkVal = (login: string | undefined, password: string | undefined) => isString(login) && isString(password)

//---TEMP
import {User} from '../../types'
interface Data {
  login: {
    status: boolean
    message: string
    user: User | null
    token: string | null
  }  
}
class Login extends Mutation<Data>{}
//---/TEMP


export default memo(() => {
  const [login, setLogin] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [validated, setValidated] = useState<boolean | undefined>(undefined)
  return (
    <Login mutation={LOGIN_USER}>
    {(mtn, { data, loading, error, client}) => {
      if(!loading && data && data.login) {
        const user = data.login.user ? data.login.user : null    
        const token = data.login.token ? data.login.token : null
        user && localStorage.setItem('user', JSON.stringify(user))
        token && localStorage.setItem('token', token)
        if(!user || !token) localStorage.clear()
        client.writeData({data:{user}})
      }
      return(
        <>
          <Loading loading={loading}>
            <form className="hdr_act_login"
            onSubmit={e => {
              e.preventDefault()
              checkVal(login, password) ? mtn({variables:{login, password}}) : setValidated(false)
            }} >
              <TextFormControl type="text" placeholder="Логин..." 
              loading={loading} onChange={val => setLogin(val)} validated={validated}/>
              <TextFormControl type="password" placeholder="Пароль..." 
              loading={loading} onChange={val => setPassword(val)} validated={validated}/>
              <button className="hdr_act_login__btn_submit" type="submit" disabled={loading}>
                <FontAwesomeIcon icon={faSignInAlt} /> 
                <p>Войти</p>
              </button>
            </form>
          </Loading>
          <ErrorHandler error={error} data={data} name="login" />           
          <Registration loading={loading}/>
        </> 
      )}}
    </Login>
  )
})
