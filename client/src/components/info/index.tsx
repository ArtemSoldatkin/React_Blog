import React, {memo} from 'react'
import './style.scss'

interface CmpProps {
    type: 'success' | 'error'
    message?: string
}

export default memo(({type, message}: CmpProps) =>(
    <div id="info">
        <div className={`info info-${type}`}>
            {message ? message : 'Проблемы с сервером, попробуйте позже!'}
        </div>        
    </div>
))
