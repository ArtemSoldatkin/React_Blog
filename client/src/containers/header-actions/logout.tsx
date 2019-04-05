import React, { memo } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { User, userEq } from '../../types';
import UserInfo from '../../components/user-info';

interface CmpProps {
    user: User;
}

const areEq = (pp: CmpProps, np: CmpProps) => {
    if (!userEq(pp.user, np.user)) return false;
    return true;
};

export default memo(
    ({ user }: CmpProps) => (
        <ApolloConsumer>
            {client => (
                <div className="logout">
                    <OverlayTrigger
                        placement="left"
                        overlay={<Tooltip id="tooltip_cabinet">В кабинет</Tooltip>}>
                        <div className="logout__user">
                            <Link to="/cabinet">
                                <UserInfo user={user} name />
                            </Link>
                        </div>
                    </OverlayTrigger>
                    <span
                        className="logout__btn"
                        onClick={() => {
                            client.writeData({ data: { user: null } });
                            localStorage.clear();
                        }}>
                        {' '}
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <p className="logout__btn_tx">Выйти</p>
                    </span>
                </div>
            )}
        </ApolloConsumer>
    ),
    areEq
);
