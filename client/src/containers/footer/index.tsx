import React, {memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import './style.scss'

export default memo(() => (
    <footer id="footer">
        <div className="content">
            <FontAwesomeIcon icon={faCopyright}/>
            <p className="text">Солдаткин Артём</p>
        </div>
    </footer>
))
