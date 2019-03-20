import React, {memo} from 'react'
import './style.scss'

interface CmpProps {
    loading: boolean
    children: JSX.Element
}

export default memo(({loading, children}: CmpProps) => (
    <div className="components_loading">        
        {children}
        {loading && <div className="components_loading__substrate">
            <div className="components_loading__loading"></div>            
        </div>}
    </div>
))
