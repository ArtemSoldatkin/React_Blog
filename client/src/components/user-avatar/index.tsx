import React, {memo} from 'react'
import {User} from '../../types'
import './style.scss'

interface CmpProps {user?: User}

export default memo(({user}: CmpProps) => (
    <div id="user-avatar">
        {user && user.avatar ?
            <img className="avatar" src={user.avatar} />
        : user && user.login &&
            <div className="avatar">            
                <p className="text">{user.login[0].toUpperCase()}</p>
            </div>
        }
    </div>
))
