import React, { memo } from 'react';
import { MessageType } from '../../types';
import './style.scss';

interface CmpProps {
    type: MessageType;
    message?: string;
}

export default memo(({ type, message }: CmpProps) => (
    <div className="info_block">
        <div className={`info_block__msg info_block-${type}`}>
            {message ? message : 'Проблемы с сервером, попробуйте позже!'}
        </div>
    </div>
));
