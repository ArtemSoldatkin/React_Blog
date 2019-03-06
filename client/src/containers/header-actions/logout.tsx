import React,{memo} from 'react'
import {Button} from 'react-bootstrap'

import LogoutForm from './logout-form'

export default memo(() => (
    <div className="header-actions-logout">
        
        <LogoutForm />
    </div>
))
