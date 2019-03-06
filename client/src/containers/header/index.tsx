import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import HeaderActions from '../header-actions'

export default memo(() => (
    <header>
        <div>
            <Link to="/">
                Logo 
                <p>Name</p>
            </Link>
        </div>
        <HeaderActions />
    </header>
))