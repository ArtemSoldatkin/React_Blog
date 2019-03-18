import React,{memo} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import { ApolloConsumer } from 'react-apollo';
import {Link} from  'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import UserAvatar from '../../components/user-avatar'
import {User} from '../../types'

interface CmpProps {
    user: User
}

export default memo(({user}: CmpProps) => (
    <ApolloConsumer>
        {client => (
            <div className="logout">
                <OverlayTrigger           
                placement="left"
                overlay={<Tooltip id="tooltip_cabinet">В кабинет</Tooltip>}>
                    <div className="user">                        
                        <Link to='/cabinet'>
                            <UserAvatar user={user}/>                           
                            <p className="login">{user.login}</p>
                        </Link>                        
                    </div>
                </OverlayTrigger>
                <span className="button_submit"                    
                    onClick={() => {
                        client.writeData({ data: { user: null } });
                        localStorage.clear();
                    }}
                >   <FontAwesomeIcon icon={faSignOutAlt} />        
                    <p className="text">Выйти</p>
                </span>
            </div>
        )}
    </ApolloConsumer>  
))
