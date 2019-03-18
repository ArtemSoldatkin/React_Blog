import React, {memo} from 'react'
import './style.scss'

interface CmpProps {
    loading: boolean
    children: JSX.Element
}

export default memo(({loading, children}: CmpProps) => (
    <div id="loading">        
        {children}
        {loading && <div className="substrate">
            <div className="loading"></div>            
        </div>}
    </div>
))
