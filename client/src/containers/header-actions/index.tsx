import React, {memo} from 'react'
import {IS_LOGGED_IN, IsLoggedIn} from '../../queries/user'
import Login from './login'
import Logout from './logout'
import './style.scss'

export default memo(() => (
  <div className="cnt_h_ac">  
    <IsLoggedIn query={IS_LOGGED_IN}>
      {({ data }) => data && data.user ? <Logout user={data.user}/> : <Login />}
    </IsLoggedIn>          
  </div>
))
