import React, {memo} from 'react'
import HeaderActions from '../header-actions'

export default memo(() => (
    <header>
        <div>
            Logo 
            <p>Name</p>
        </div>
        <HeaderActions />
    </header>
))