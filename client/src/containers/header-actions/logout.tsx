import React,{memo} from 'react'
import {Button, Image, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { ApolloConsumer } from 'react-apollo';
import {Link} from  'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
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
                overlay={<Tooltip id="tooltip-cabinet">В кабинет</Tooltip>}>
                    <div className="user">                        
                        <Link to='/cabinet'>
                            <Image className="user__avatar" src={user.avatar} rounded  />
                            <p className="user__login">{user.login}</p>
                        </Link>                        
                    </div>
                </OverlayTrigger>
                <Button className="button"
                    variant="link"
                    onClick={() => {
                    client.writeData({ data: { isLoggedIn: false } });
                    localStorage.clear();
                    }}
                >   <FontAwesomeIcon icon={faSignOutAlt} />        
                    <p>Выйти</p>
                </Button>
            </div>
        )}
    </ApolloConsumer>  
))
