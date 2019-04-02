import React, {memo, useState} from 'react'
import {MutationFn} from 'react-apollo'
import {AddReview, ADD_REVIEW, ReviewsFR as fragment} from '../../../queries/review'
import {  User } from '../../../types';
import UserAvatar from '../../../components/user-avatar'
import Loading from '../../../components/loading'
import ErrorHandler from '../../../components/error-handler'

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
                cache.writeFragment({fragment, id, data: {_r, reviews, __typename: 'Article'}})     
                setBody('')      
            }
        }}>
            {(addReview, {loading, error}) => (
                <Loading loading={loading}>
                    <div className="new_review">                    
                        <UserAvatar user={props.user} />
                        <form className="new_review__form" onSubmit={(e) => handleSubmit(e, addReview)} >
                            <textarea className="new_review__itx" value={body} onChange={(e) => setBody(e.target.value)} />
                            <button className="new_review__btn" type="submit" disabled={body.trim().length <= 0 || loading}>
                                Отправить
                            </button>
                            <ErrorHandler error={error} />
                        </form>                    
                    </div>
                </Loading>
            )}
        </AddReview>
    )
})
