import React, {memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import './style.scss'

export default memo(() => (
    <footer className="cnt_f">
        <div className="cnt_f__cnt">
            <FontAwesomeIcon icon={faCopyright}/>
            <p className="cnt_f__tx">Солдаткин Артём</p>
        </div>
    </footer>
))
