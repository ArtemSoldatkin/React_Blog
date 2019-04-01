import React, { memo } from "react";
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import { RemoveReview, REMOVE_REVIEW, ReviewsFR as fragment } from "../../../queries/review";
import { RemoveArticle, REMOVE_ARTICLE } from "../../../queries/article";
import { DocType } from "../../../types";
import ButtonWithConfirm from '../../../components/button-with-confirm'

interface CmpProps extends RouteComponentProps {
    type: DocType   
    id: string  
    articleID?: string 
}
    
export default withRouter(memo((props: CmpProps) => {  
    if(props.type === 'Review') return (
      <RemoveReview mutation={REMOVE_REVIEW}
      update={(cache, { data }) => { 
        if(data && data.removeReview && data.removeReview.success){
            const id = `Article:${props.articleID}`
            const _r:any = cache.readFragment({fragment, id})
            const reviews = _r.reviews.filter((review: any) => review.id !== props.id)            
            cache.writeFragment({fragment, id, data: {_r, reviews}})           
        }
    }}>
        {(mtn) => {
          const remove = () => props.articleID && mtn({variables:{id: props.id}})
          return <ButtonWithConfirm icon={faTrash} text="Удалить" fnc={remove} />
        }}
      </RemoveReview>
    )
    return (
        <RemoveArticle mutation={REMOVE_ARTICLE}
        onCompleted={(data) => data && data.removeArticle && data.removeArticle.success && props.history.push('/')}
        >
            {(mtn) => {
            const remove = () => mtn({variables:{id: props.id}})   
            return <ButtonWithConfirm icon={faTrash} text="Удалить" fnc={remove} />
            }}
        </RemoveArticle>
    ) 
  }))  
