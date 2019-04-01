import React, {memo} from 'react'
import './style.scss'

interface CmpProps {
    type: 'success' | 'error'
    message?: string
}

export default memo(({type, message}: CmpProps) =>(
    <div className="info_block">
        <div className={`info_block__msg info_block-${type}`}>
            {message ? message : 'Проблемы с сервером, попробуйте позже!'}
        </div>        
    </div>
))
