import React, {memo, useState} from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo';
import {Button, Modal} from 'react-bootstrap'
import {REGISTRY_USER, IS_LOGGED_IN} from '../../../queries/user'
import RegistrationForm from './form'
import Loading from '../../../components/loading'
import ErrorHandler from '../../../components/error-handler'

interface CmpProps {
  loading?: boolean
}

export default memo(({loading: load}: CmpProps) => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <Mutation mutation={REGISTRY_USER}>
    {(addUser, { data, loading, error, client }) => {
      if(!loading && data && data.addUser) {
        const user = data.addUser.user ? data.addUser.user : null    
        const token = data.addUser.token ? data.addUser.token : null
        user && localStorage.setItem('user', JSON.stringify(user))
        token && localStorage.setItem('token', token)
        if(!token) localStorage.clear()        
        client.writeQuery({query: IS_LOGGED_IN, data:{user}})       
        user && setShow(false) 
      }
      return (
        <div className="registration">         
          <button  className="show_modal" onClick={() => setShow(true)} disabled={load}>Регистрация</button>
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Loading loading={loading}>
                  <RegistrationForm loading={loading} addUser={addUser}/>
                </Loading>
                <ErrorHandler data={data} error={error} name="addUser" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)} disabled={loading}>Закрыть</Button>
              <Button type="submit" form="registryForm" disabled={loading}>Зарегистрироваться</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }}
    </Mutation>
  )
})
