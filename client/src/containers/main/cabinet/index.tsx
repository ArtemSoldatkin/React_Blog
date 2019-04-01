import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faFileSignature} from "@fortawesome/free-solid-svg-icons";
import {IS_LOGGED_IN, IsLoggedIn} from '../../../queries/user'
import Articles from '../articles'
import './style.scss'

export default memo(() => (    
    <div className="cabinet">
        <div className="cabinet__ac">
            <Link to='/cabinet/new-article'>
                <div className="cabinet__tab">
                    <FontAwesomeIcon icon={faFileSignature} className="icon" />
                    <p className="cabinet__tx">Новая статья</p>
                </div>
            </Link>
            <Link to='/cabinet/info'>                
                <div className="cabinet__tab">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <p className="cabinet__tx">Обо мне</p>
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
