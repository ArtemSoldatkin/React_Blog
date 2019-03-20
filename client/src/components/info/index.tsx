import React, {memo} from 'react'
import './style.scss'

interface CmpProps {
    type: 'success' | 'error'
    message?: string
}

export default memo(({type, message}: CmpProps) =>(
    <div className="components_info">
        <div className={`components_info__message components_info-${type}`}>
            {message ? message : 'Проблемы с сервером, попробуйте позже!'}
        </div>        
    </div>
))
