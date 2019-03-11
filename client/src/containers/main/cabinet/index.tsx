import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import Articles from '../articles'
import {IS_LOGGED_IN} from '../../../queries/user'
import {User} from '../../../types'
import { Query } from 'react-apollo';

export default memo(() => (    
    <div className="cabinet">
        <Link to='/cabinet/new-article'>
            <p>Новая статья</p>
        </Link>
        <Link to='/cabinet/info'>
            <p>Обо мне</p>
        </Link>
        <Query query={IS_LOGGED_IN}>
            {({ data }) => {   
            const user: User | undefined = data && data.user && JSON.parse(data.user)  
            return <Articles user={user}/>
            }}
        </Query>        
    </div>
))
