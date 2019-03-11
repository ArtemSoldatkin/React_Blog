import React, {PureComponent} from 'react'
import { MutationFn } from 'react-apollo';
import { Mutation, ApolloConsumer } from 'react-apollo';
import {EDIT_USER} from '../../../../queries/user'
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
  private handleChangeAvatar = (avatar: string): void => this.setState({avatar})
  private handleSubmit = (callback:MutationFn): void => {
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
              localStorage.setItem('user', JSON.stringify(editUser.user))          
              client.writeData({ data: {                
                user: editUser.user ? JSON.stringify(editUser.user) : null
              } });
            }}
          >
            {(editUser, { data, loading, error }) => (
              <div className="info">
                <AvatarLoader onChange={this.handleChangeAvatar} loading={loading}/>
                <button onClick={() => this.handleSubmit(editUser)} disabled={loading || !avatar}>Отправить</button>
                {error && <p>Ошибка!!</p>}

              </div>              
            )}
          </Mutation>
        )}
      </ApolloConsumer>   
    )
  }
}
