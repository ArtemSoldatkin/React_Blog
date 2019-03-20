import React, {memo, useState} from 'react'
import {Query, Mutation, MutationFn} from 'react-apollo'
import UserAvatar from '../../../components/user-avatar'
import { Reviews, User } from '../../../types';

interface CmpProps {
    articleID: string
    user: User
    loading: boolean
    mtn: MutationFn
}
const handleSubmit = (e: React.FormEvent<HTMLFormElement>, mtn: MutationFn,id: string, body: string) => {
    e.preventDefault()
    mtn({variables:{id, body}})
}
export default memo(({articleID, user, loading, mtn}: CmpProps) => {
    const [body, setBody] = useState('')
    return (
        <div className="new-review">
            <UserAvatar user={user} />
            <form className="form-review" onSubmit={(e) => handleSubmit(e, mtn, articleID, body)} >
                <textarea value={body} onChange={(e) => setBody(e.target.value)} />
                <button type="submit" disabled={body.trim().length <= 0 || loading}>Отправить</button>
            </form>
        </div>
    )
})
