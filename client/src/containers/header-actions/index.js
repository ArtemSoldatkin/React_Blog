import React, {memo} from 'react'

import Login from './login'
import Logout from './logout'
import Registration from './registration'
 
const token = null

export default memo(() => (
    <div className="header-actions">
        {token ? <Logout /> : <div><Login /><Registration /></div>}
    </div>
))