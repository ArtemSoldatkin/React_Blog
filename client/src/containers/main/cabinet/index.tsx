import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faFileSignature} from "@fortawesome/free-solid-svg-icons";
import Articles from '../articles'
import {IS_LOGGED_IN} from '../../../queries/user'
import {User} from '../../../types'
import './style.scss'

export default memo(() => (    
    <div id="cabinet">
        <div className="actions">
            <Link to='/cabinet/new-article'>
                <div className="tab">
                    <FontAwesomeIcon icon={faFileSignature} className="icon" />
                    <p className="text">Новая статья</p>
                </div>
            </Link>
            <Link to='/cabinet/info'>                
                <div className="tab">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <p className="text">Обо мне</p>
                </div>
            </Link>
        </div>
        <Query query={IS_LOGGED_IN}>
            {({ data: {user} }) => {   
            //const user: User | undefined = data && data.user && JSON.parse(data.user)  
            return <Articles user={user}/>
            }}
        </Query>        
    </div>
))
