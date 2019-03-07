import React, {memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import './style.scss'

export default memo( () => (
    <footer className="footer">
        <div className="content">
            <FontAwesomeIcon icon={faCopyright}/>
            <p className="content__text">Солдаткин Артём</p>
        </div>
    </footer>
))
