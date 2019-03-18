import React, {memo} from 'react'
import Votes from '../../votes'

interface Vote {
    userID: string
    value: boolean
}

interface CmpProps {
    votes: Vote[]
}

export default memo(({votes}: CmpProps) => (
    <footer>
        <Votes votes={votes} actionType='article'/>
    </footer>
))
