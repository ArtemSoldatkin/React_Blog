import React, { useEffect, useState } from 'react';
import { MutationFn } from 'react-apollo';
import { EDIT_USER, EditUser } from '../../../../queries/user';
import { optStr } from '../../../../types';
import Loading from '../../../../components/loading';
import ErrorHandler from '../../../../components/error-handler';
import AvatarLoader from './avatar-loader';
import './style.scss';

export default () => {
    const [avatar, setAvatar] = useState<optStr>(undefined);
    useEffect(() => {}, [avatar]);
    const handleSubmit = (callback: MutationFn) => {
        if (!avatar) return;
        callback({ variables: { avatar } });
    };
    return (
        <EditUser
            mutation={EDIT_USER}
            update={(cache, { data }) => {
                if (data && data.editUser && data.editUser.user) {
                    localStorage.setItem('user', JSON.stringify(data.editUser.user));
                    cache.writeData({
                        data: {
                            user: data.editUser.user ? data.editUser.user : null,
                        },
                    });
                }
            }}>
            {(editUser, { data, loading, error }) => {
                return (
                    <div className="cabinet_info">
                        <Loading loading={loading}>
                            <AvatarLoader onChange={val => setAvatar(val)} loading={loading} />
                        </Loading>
                        <button
                            className="cabinet_info__btn"
                            onClick={() => handleSubmit(editUser)}
                            disabled={loading || !avatar}>
                            Отправить
                        </button>
                        <ErrorHandler error={error} data={data} />
                    </div>
                );
            }}
        </EditUser>
    );
};
