import React, {PureComponent, memo, useState} from 'react'
import { MutationFn } from 'react-apollo';
import { Mutation, ApolloConsumer } from 'react-apollo';
import {User} from '../../../../types'
import {EDIT_USER} from '../../../../queries/user'
import Loading from '../../../../components/loading'
import Info from '../../../../components/info'
import AvatarLoader from './avatar-loader'
import './style.scss'

//--- TEMP
interface T_EditUser {
  editUser: null | {
    message: string
    status: boolean
    user: User
  }
}
class EditUser extends Mutation<T_EditUser>{}
///---TEMP


export default memo(() => {
  const [avatar, setAvatar] = useState<string | undefined>(undefined)  
  const handleSubmit = (callback: MutationFn) => {   
    if(!avatar) return
    callback({variables:{avatar}})
  } 
  return (
    <Mutation mutation={EDIT_USER}>
            {(editUser, { data, loading, error, client }) => {
            if(!loading && data && data.editUser && data.editUser.user) {
              localStorage.setItem('user', JSON.stringify(data.editUser.user))          
              client.writeData({ data: {                
                user: data.editUser.user ? data.editUser.user : null
              } });
            }
            return (
              <div id="cabinet__info">
                <Loading loading={loading}>
                  <AvatarLoader onChange={val => setAvatar(val)} loading={loading}/>
                </Loading>
                <button onClick={() => handleSubmit(editUser)} disabled={loading || !avatar}>Отправить</button>
                {data && data.editUser ? (
                        data.editUser.status ? 
                          <Info type="success" message={data.editUser.message}/> 
                        : 
                          <Info type="error" message={data.editUser.message}/>
                      ) 
                      : 
                      (error && <Info type="error" />)}

              </div>              
            )}}
          </Mutation>     
  )
})

/*import React, {PureComponent} from 'react'
import { MutationFn } from 'react-apollo';
import { Mutation, ApolloConsumer } from 'react-apollo';
import {EDIT_USER} from '../../../../queries/user'
import Loading from '../../../../components/loading'
import Info from '../../../../components/info'
import AvatarLoader from './avatar-loader'
import './style.scss'

interface CmpProps {}
interface CmpStates { 
  avatar: string | undefined
}

export default class CabinetInfo extends PureComponent<CmpProps, CmpStates> {
  constructor(props: CmpProps) {
    super(props)
    this.state= {avatar: undefined}
  } 
  private handleChangeAvatar = (avatar: string) => this.setState({avatar})
  private handleSubmit = (callback: MutationFn) => {
    const {avatar} = this.state
    if(!avatar) return
    callback({variables:{avatar}})
  } 
  render (){
    const {avatar} = this.state
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={EDIT_USER}
            onCompleted={({ editUser }) => {    
              localStorage.removeItem('user')
              localStorage.setItem('user', JSON.stringify(editUser.user))          
              client.writeData({ data: {                
                user: editUser.user ? JSON.stringify(editUser.user) : null
              } });
            }}
          >
            {(editUser, { data, loading, error }) => (
              <div id="cabinet__info">
                <Loading loading={loading}>
                  <AvatarLoader onChange={this.handleChangeAvatar} loading={loading}/>
                </Loading>
                <button onClick={() => this.handleSubmit(editUser)} disabled={loading || !avatar}>Отправить</button>
                {data && data.editUser ? (
                        data.editUser.status ? 
                          <Info type="success" message={data.editUser.message}/> 
                        : 
                          <Info type="error" message={data.editUser.message}/>
                      ) 
                      : 
                      (error && <Info type="error" />)}

              </div>              
            )}
          </Mutation>
        )}
      </ApolloConsumer>   
    )
  }
}
*/