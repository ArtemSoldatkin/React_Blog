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
    <div className="main_actions__popover_content">
      {isEditing ? (
        <>
          <ButtonWithConfirm icon={faUndo} text="Отменить" fnc={complete}/>
          <ActionEdit complete={complete} type={type} id={id} inputData={inputData}/>          
        </>
      ) : (
        <span className="button" onClick={() => setIsEditing(true)}>
          <FontAwesomeIcon icon={faEdit} className="icon" />
          <p className="text">Редактировать</p>
        </span>
      )}
      <ActionRemove id={id} type={type} articleID={articleID} />      
    </div>
  )
})
