import React, { memo } from "react"
import {faSave} from "@fortawesome/free-solid-svg-icons"
import { EDIT_REVIEW, EditReview } from "../../../queries/review"
import { EDIT_ARTICLE, EditArticle } from "../../../queries/article"
import {DocType, InputData} from '../../../types'
import ButtonWithConfirm from '../../../components/button-with-confirm'

interface CmpProps {
  id: string
  type: DocType
  inputData: InputData
  complete: () => void 
}  
 
export default memo(({ id, type, inputData, complete}: CmpProps) => {       
    if(type === 'Review') return (
      <EditReview mutation={EDIT_REVIEW}>
        {(mtn) => {
          const save = () => {            
            const {body} = inputData
            mtn({variables:{id, body}})
          }
          return <ButtonWithConfirm icon={faSave} text="Сохранить" fnc={save} />
        }}
      </EditReview>
    )
    return (
        <EditArticle mutation={EDIT_ARTICLE} onCompleted={() => complete()}>
            {(mtn) => {
            const save = () => {               
                const {title, description, body} = inputData 
                if(!title && !description) return
                mtn({variables:{id, title, description, body}})
            } 
            return <ButtonWithConfirm icon={faSave} text="Сохранить" fnc={save} />
            }}
        </EditArticle>
    ) 
  })
  