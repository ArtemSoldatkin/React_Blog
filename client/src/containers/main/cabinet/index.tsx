import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faFileSignature} from "@fortawesome/free-solid-svg-icons";
import {IS_LOGGED_IN, IsLoggedIn} from '../../../queries/user'
import Articles from '../articles'
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
        <IsLoggedIn query={IS_LOGGED_IN}>
            {({ data }) => {
                const user = data && data.user ? data.user : undefined
                return <Articles user={user} />
            }}
        </IsLoggedIn>        
    </div>
))
