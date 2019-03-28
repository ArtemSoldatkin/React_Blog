import React,{memo} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import { ApolloConsumer } from 'react-apollo';
import {Link} from  'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {User} from '../../types'
import UserAvatar from '../../components/user-avatar'

interface CmpProps {
    user: User
}

export default memo(({user}: CmpProps) => (
    <ApolloConsumer>
        {client => (
            <div className="h_ac_logout">
                <OverlayTrigger           
                placement="left"
                overlay={<Tooltip id="tooltip_cabinet">В кабинет</Tooltip>}>
                    <div className="h_ac_logout__user">                        
                        <Link to='/cabinet'>
                            <UserAvatar user={user}/>                           
                            <p className="h_ac_logout__name">{user.login}</p>
                        </Link>                        
                    </div>
                </OverlayTrigger>
                <span className="h_ac_logout__btn"                    
                    onClick={() => {
                        client.writeData({ data: { user: null } });                       
                        localStorage.clear();
                    }}
                >   <FontAwesomeIcon icon={faSignOutAlt} />        
                    <p className="h_ac_logout__btn_tx">Выйти</p>
                </span>
            </div>
        )}
    </ApolloConsumer>  
))
