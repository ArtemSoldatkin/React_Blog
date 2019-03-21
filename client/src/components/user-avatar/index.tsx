import React, {memo} from 'react'
import {User} from '../../types'
import './style.scss'

interface CmpProps {user?: User}

export default memo(({user}: CmpProps) => (
    <div className="cmp_user_avatar">
        {user && user.avatar ?
            <img className="cmp_user_avatar__avatar" src={user.avatar} />
        : user && user.login &&
            <div className="cmp_user_avatar__avatar">            
                <p className="cmp_user_avatar__txt">{user.login[0].toUpperCase()}</p>
            </div>
        }
    </div>
))
