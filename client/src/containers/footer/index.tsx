import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import './style.scss';

export default () => (
    <footer className="footer">
        <div className="footer__cnt">
            <FontAwesomeIcon icon={faCopyright} />
            <p className="footer__tx">Солдаткин Артём</p>
        </div>
    </footer>
);
