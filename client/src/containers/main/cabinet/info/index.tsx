import React, {memo, useState} from 'react'
import { MutationFn } from 'react-apollo';
import {EDIT_USER, EditUser} from '../../../../queries/user'
import Loading from '../../../../components/loading'
import Info from '../../../../components/info'
import AvatarLoader from './avatar-loader'
import './style.scss'

export default memo(() => {
  const [avatar, setAvatar] = useState<string | undefined>(undefined)  
  const handleSubmit = (callback: MutationFn) => {   
    if(!avatar) return
    callback({variables:{avatar}})
  } 
  return (
    <EditUser mutation={EDIT_USER}
    update = {(cache, {data}) => {
      if(data && data.editUser && data.editUser.user) {
        localStorage.setItem('user', JSON.stringify(data.editUser.user))          
        cache.writeData({ data: {                
          user: data.editUser.user ? data.editUser.user : null
        }});
      }
    }}>
    {(editUser, { data, loading, error }) => {
    return (
              <div id="cabinet__info">
                <Loading loading={loading}>
                  <AvatarLoader onChange={val => setAvatar(val)} loading={loading}/>
                </Loading>
                <button onClick={() => handleSubmit(editUser)} disabled={loading || !avatar}>Отправить</button>
                {data && data.editUser ? (
                        data.editUser.success ? 
                          <Info type="success" message={data.editUser.message}/> 
                        : 
                          <Info type="error" message={data.editUser.message}/>
                      ) 
                      : 
                      (error && <Info type="error" />)}

              </div>              
            )}}
          </EditUser>     
  )
})
