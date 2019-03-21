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
            <div className="hdr_act_logout">
                <OverlayTrigger           
                placement="left"
                overlay={<Tooltip id="tooltip_cabinet">В кабинет</Tooltip>}>
                    <div className="hdr_act_logout__user">                        
                        <Link to='/cabinet'>
                            <UserAvatar user={user}/>                           
                            <p className="hdr_act_logout__login">{user.login}</p>
                        </Link>                        
                    </div>
                </OverlayTrigger>
                <span className="hdr_act_logout__btn_submit"                    
                    onClick={() => {
                        client.writeData({ data: { user: null } });
                        localStorage.clear();
                    }}
                >   <FontAwesomeIcon icon={faSignOutAlt} />        
                    <p className="hdr_act_logout__btn_text">Выйти</p>
                </span>
            </div>
        )}
    </ApolloConsumer>  
))
