import React, {memo, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {REGISTRY_USER, Registry} from '../../../queries/user'
import Loading from '../../../components/loading'
import ErrorHandler from '../../../components/error-handler'
import RegistrationForm from './form'

interface CmpProps {
  loading?: boolean
}

export default memo(({loading: load}: CmpProps) => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <Registry mutation={REGISTRY_USER} update={(cache, {data}) => {    
      if(data && data.addUser) {        
        const {user, token} = data.addUser
        user && localStorage.setItem('user', JSON.stringify(user))
        token && localStorage.setItem('token', token)
        if(!user || !token) localStorage.clear()
        cache.writeData({data:{user}})
        user && setShow(false)
      }
    }}>
    {(addUser, { loading, error}) => (
        <div className="registration">         
          <button  className="registration__btn" onClick={() => setShow(true)} disabled={load}>Регистрация</button>
          <Modal show={show} onHide={() => !loading && setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Loading loading={loading}>
                  <RegistrationForm loading={loading} addUser={addUser}/>
                </Loading>
                <ErrorHandler error={error} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)} disabled={loading}>Закрыть</Button>
              <Button type="submit" form="reg_form" disabled={loading}>Зарегистрироваться</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }
    </Registry>
  )
})
