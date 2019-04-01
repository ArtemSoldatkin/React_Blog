import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import {User} from '../../types'
import UserAvatar from '../user-avatar'
import './style.scss'

interface CmpProps {
    user: User
    link?: boolean
    name?: boolean
}

export default memo(({user, link, name}: CmpProps) => {
    const User = (
        <div className="user_info">
            <UserAvatar user={user} />
            {name && <p className="user_info__name">{user.login}</p>} 
        </div>
    )
    if(link) return <Link to={`/user/${user.id}`}>{User}</Link>    
    return User  
})
