import React, { PureComponent } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import {Button, Modal} from 'react-bootstrap'
import {REGISTRY_USER} from '../../../queries/user'
import RegistrationForm from './form'
import Loading from '../../../components/loading'
import Info from '../../../components/info'

interface CmpProps {
  loading?: boolean
  
}
interface CmpStates {
  show: boolean
}

export default class Registry extends PureComponent<CmpProps, CmpStates> {
  constructor(props: CmpProps) {
    super(props)
    this.state = {show: false}
  }
  private handleShow = () => this.setState({show: true})
  private handleClose = () => this.setState({show: false})     
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
              localStorage.clear()
              token && localStorage.setItem('token', token)
              user && localStorage.setItem('user', user)   
              user && this.handleClose()        
              client.writeData({ data: { user } });
              console.log(client, 'client')
            }}
          >
            {(addUser, { data, loading, error }) => (
              <div className="registration">
                <button  className="show_modal" onClick={this.handleShow} disabled={loading}>Регистрация</button>
                <Modal show={show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Регистрация</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <Loading loading={loading}>
                        <RegistrationForm loading={loading} addUser={addUser}/>
                      </Loading>
                      {data && data.addUser ? (
                        data.addUser.status ? 
                          <Info type="success" message={data.addUser.message}/> 
                        : 
                          <Info type="error" message={data.addUser.message}/>
                      ) 
                      : 
                      (error && <Info type="error" />)}
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
