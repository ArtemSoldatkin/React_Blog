import React, {memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import './style.scss'

export default memo(() => (
    <footer className="cnt_footer">
        <div className="cnt_footer__content">
            <FontAwesomeIcon icon={faCopyright}/>
            <p className="cnt_footer__text">Солдаткин Артём</p>
        </div>
    </footer>
))
