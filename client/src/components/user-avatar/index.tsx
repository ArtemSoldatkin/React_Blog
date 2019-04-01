import React, {memo} from 'react'
import {User} from '../../types'
import './style.scss'

interface CmpProps {user?: User}

export default memo(({user}: CmpProps) => (
    <div className="user_avatar">
        {user && user.avatar ?
            <img className="user_avatar__avatar" src={user.avatar} />
        : user && user.login &&
            <div className="user_avatar__avatar">            
                <p className="user_avatar__tx">{user.login[0].toUpperCase()}</p>
            </div>
        }
    </div>
))
