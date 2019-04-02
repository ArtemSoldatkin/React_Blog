import React, {memo} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGrinBeamSweat} from "@fortawesome/free-solid-svg-icons";
import './style.scss'

export default memo (() => (
    <div className="error_404">
        <p className="error_404__text">Страница не найдена!</p> 
        <FontAwesomeIcon className="error_404__icon" icon={faGrinBeamSweat} />
    </div>
))
