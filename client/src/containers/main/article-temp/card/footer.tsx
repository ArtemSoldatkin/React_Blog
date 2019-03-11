import React, {memo} from 'react'
import Votes from '../../votes'

interface Vote {
    userID: string
    value: boolean
}

interface CmpProps {
    vote: Vote[]
}

export default memo(({vote}: CmpProps) => (
    <div className="article-card__footer">
        <Votes vote={vote}/>
    </div>
))
