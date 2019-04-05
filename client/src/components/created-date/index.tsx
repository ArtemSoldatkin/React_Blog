import React, { memo } from 'react';
import Moment from 'react-moment';
import './style.scss';

interface CmpProps {
    isEdited: boolean;
    created: string;
}

export default memo(({ isEdited, created }: CmpProps) => (
    <div className="created_date">
        <p className="created_date__tx">{isEdited ? 'Отредактирована:' : 'Создана:'}</p>
        <Moment format="DD.MM.YYYY HH:mm" date={Number(created)} />
    </div>
));
