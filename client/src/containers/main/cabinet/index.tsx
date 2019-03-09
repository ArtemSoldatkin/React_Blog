import React, {memo} from 'react'
import {Link} from 'react-router-dom'

export default memo(() => (
    <div className="cabinet">
        <Link to='/cabinet/new-article'>
            <p>Новая статья</p>
        </Link>
        <Link to='/cabinet/info'>
            <p>Обо мне</p>
        </Link>
    </div>
))
