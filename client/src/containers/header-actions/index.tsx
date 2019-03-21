import React, {memo} from 'react'
import { Query } from 'react-apollo';
import {IS_LOGGED_IN} from '../../queries/user'
import Login from './login'
import Logout from './logout'
import './style.scss'

//---TEMP
import {User} from '../../types'
interface Data {
  user: User | null
}
class GetUser extends Query<Data>{}
//---/TEMP

export default memo(() => (
  <div className="cnt_header_actn">  
    <GetUser query={IS_LOGGED_IN}>
      {({ data, loading }) => { 
        if(loading)return <></>        
        if(data && data.user) return <Logout user={data.user}/>      
        return <Login /> 
      }}
    </GetUser>          
  </div>
))
