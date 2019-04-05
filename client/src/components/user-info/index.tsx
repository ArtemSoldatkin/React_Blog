import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { User, userEq } from '../../types';
import UserAvatar from '../user-avatar';
import './style.scss';

interface CmpProps {
    user: User;
    link?: boolean;
    name?: boolean;
}

const areEq = (pp: CmpProps, np: CmpProps) => {
    if (pp.link !== np.link) return false;
    if (pp.name !== np.name) return false;
    if (pp.user !== undefined && np.user === undefined) return false;
    if (pp.user === undefined && np.user !== undefined) return false;
    if (pp.user && np.user && !userEq(pp.user, np.user)) return false;
    return true;
};

export default memo(({ user, link, name }: CmpProps) => {
    const User = (
        <div className="user_info">
            <UserAvatar user={user} />
            {name && <p className="user_info__name">{user.login}</p>}
        </div>
    );
    if (link) return <Link to={`/user/${user.id}`}>{User}</Link>;
    return User;
}, areEq);
