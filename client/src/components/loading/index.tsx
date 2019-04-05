import React, { memo } from 'react';
import './style.scss';

interface CmpProps {
    loading: boolean;
    children?: JSX.Element;
}

export default memo(({ loading, children }: CmpProps) => (
    <div className="loading_block">
        {children ? children : <div className="loading_block__temp" />}
        {loading && (
            <div className="loading_block__substrate">
                <div className="loading_block__load" />
            </div>
        )}
    </div>
));
