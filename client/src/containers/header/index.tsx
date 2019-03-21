import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import HeaderActions from '../header-actions'
import './style.scss'

export default memo(() => (
    <header className="cnt_header">        
        <div className="cnt_header__logo">
            <OverlayTrigger           
            placement="bottom"
            overlay={<Tooltip id="tooltip_home">На главную</Tooltip>}>
                <Link to="/">
                    <FontAwesomeIcon icon={faCoffee} />
                    <p className="cnt_header__text">Блог</p>
                </Link>
            </OverlayTrigger>
        </div>
        <div className="cnt_header__actions">
            <HeaderActions />
        </div>        
    </header>
))
