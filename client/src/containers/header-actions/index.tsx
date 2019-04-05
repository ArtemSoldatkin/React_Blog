import React from 'react';
import { IS_LOGGED_IN, IsLoggedIn } from '../../queries/user';
import Login from './login';
import Logout from './logout';
import './style.scss';

export default () => (
    <IsLoggedIn query={IS_LOGGED_IN}>
        {({ data }) => (data && data.user ? <Logout user={data.user} /> : <Login />)}
    </IsLoggedIn>
);
