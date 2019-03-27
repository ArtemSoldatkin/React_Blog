import React, {memo, useState} from 'react'
import {Query, Mutation, MutationFn} from 'react-apollo'
import UserAvatar from '../../../components/user-avatar'
import { Reviews, User } from '../../../types';
import gql from 'graphql-tag'

interface CmpProps {
    user: User
    articleID: string  
}

//---TEMP

interface T_AddReview {
    addReview: {reviews: Reviews}
}
class AddReview extends Mutation<T_AddReview>{}

const ADD_REVIEW = gql`
    mutation AddReview($id: String!, $body: String!) {
        addReview(id: $id, body: $body) {    
           # user @client {id login avatar}     
            reviews {
                id 
                user {id login avatar} 
                body 
                votes{ userID value} 
                created
                isEdited
            }
        }
    }
`

const fragment = gql`
    fragment Reviews on Article {
        reviews {id}
    }
`

///--TEMP

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
            }
        }}>
            {(addReview, {data, loading, error, client}) => (
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
