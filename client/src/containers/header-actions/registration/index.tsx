import React, { PureComponent } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import {Button, Modal} from 'react-bootstrap'
import {REGISTRY_USER} from '../../../queries/user'
import RegistrationForm from './form'

interface CmpProps {
  
}
interface CmpStates {
  show: boolean
}

export default class Registry extends PureComponent<CmpProps, CmpStates> {
  constructor(props: CmpProps) {
    super(props)
    this.state = {show: false}
  }
  private handleShow = (): void => this.setState({show: true})
  private handleClose = (): void => this.setState({show: false}) 
    
  render () {
    const {show} = this.state
    return (
      <ApolloConsumer>       
        {client => (
          <Mutation
            mutation={REGISTRY_USER}
            onCompleted={({ addUser }) => {      
              const token = addUser && addUser.token ? addUser.token : null
              const user = addUser && addUser.user ? JSON.stringify(addUser.user) : null
              token && localStorage.setItem('token', token)
              user && localStorage.setItem('user', user)   
              user && this.handleClose()        
              client.writeData({ data: { user } });
            }}
          >
            {(addUser, { data, loading, error }) => (
              <div className="header-actions-logout">
                <Button onClick={this.handleShow} variant="link">Регистрация</Button>
                <Modal show={show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Регистрация</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <RegistrationForm loading={loading} addUser={addUser}/>
                      {error && <p>Ошибка</p>}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose} disabled={loading}>Закрыть</Button>
                    <Button type="submit" form="registryForm" disabled={loading}>Зарегистрироваться</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    )
  }
}
