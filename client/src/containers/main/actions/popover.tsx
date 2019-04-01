import React, {memo} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUndo,faEdit} from "@fortawesome/free-solid-svg-icons";
import { DocType, InputData } from "../../../types";
import ButtonWithConfirm from '../../../components/button-with-confirm'
import ActionEdit from './edit'
import ActionRemove from './remove'

interface CmpProps{
  type: DocType, 
  id: string
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  inputData: InputData
  articleID?:string
}  

export default memo(({type, id, isEditing, setIsEditing, inputData,articleID}: CmpProps) => {
  const complete = () => setIsEditing(false)  
  return (
    <div className="acts_pop__cnt">
      {isEditing ? (
        <>
          <ButtonWithConfirm icon={faUndo} text="Отменить" fnc={complete}/>
          <ActionEdit complete={complete} type={type} id={id} inputData={inputData}/>          
        </>
      ) : (
        <span className="acts_pop__btn" onClick={() => setIsEditing(true)}>
          <FontAwesomeIcon icon={faEdit} className="acts_pop__icon" />
          <p className="acts_pop__tx">Редактировать</p>
        </span>
      )}
      <ActionRemove id={id} type={type} articleID={articleID} />      
    </div>
  )
})
