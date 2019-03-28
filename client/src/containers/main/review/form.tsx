import React, {memo, useState} from 'react'
import {MutationFn} from 'react-apollo'
import {AddReview, ADD_REVIEW, ReviewsFR as fragment} from '../../../queries/review'
import {  User } from '../../../types';
import UserAvatar from '../../../components/user-avatar'

interface CmpProps {
    user: User
    articleID: string  
}

export default memo((props: CmpProps) => {
    const [body, setBody] = useState('')
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, mtn: MutationFn) => {
        e.preventDefault()
        mtn({variables:{id: props.articleID, body}})
    }
    return (
        <AddReview mutation={ADD_REVIEW} 
        update={(cache, { data }) => {            
            if(data && data.addReview && data.addReview.reviews){
                const id = `Article:${props.articleID}`
                const _r = cache.readFragment({fragment, id})
                const {reviews} = data.addReview
                cache.writeFragment({fragment, id, data: {_r, reviews}})     
                setBody('')      
            }
        }}>
            {(addReview, {data, loading, error}) => (
                <div className="new-review">
                    <UserAvatar user={props.user} />
                    <form className="form-review" onSubmit={(e) => handleSubmit(e, addReview)} >
                        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
                        <button type="submit" disabled={body.trim().length <= 0 || loading}>Отправить</button>
                    </form>
                </div>
            )}
        </AddReview>
    )
})
