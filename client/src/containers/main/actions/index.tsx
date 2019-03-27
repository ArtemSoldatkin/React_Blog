import React, { memo } from "react";
import { Popover, OverlayTrigger} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {IS_LOGGED_IN, IsLoggedIn} from '../../../queries/user'
import { DocType, InputData } from "../../../types";
import ActionPopover from './popover'
import './style.scss'

interface CmpProps {
  id: string
  type: DocType
  userID: string
  isEditing: boolean  
  inputData: InputData
  setIsEditing: (isEditing: boolean) => void
  articleID?: string
}

export default memo((props: CmpProps) => (
  <IsLoggedIn query={IS_LOGGED_IN}>
    {({ data }) => {
      if(data && data.user && data.user.id === props.userID){
        return (
        <div className="main_actions">
          <OverlayTrigger
          trigger="click"                  
          placement="left-start"
          overlay={
            <Popover id={`${props.type}__${props.id}`} className="modal-block" placement="left-start">    
              <ActionPopover type={props.type} id={props.id} isEditing={props.isEditing}
              setIsEditing={props.setIsEditing}
              inputData={props.inputData}
              articleID={props.articleID}
              />
            </Popover >
          }>
            <span className="act-button">
              <FontAwesomeIcon icon={faEllipsisV} className="button__icon" />           
            </span>
          </OverlayTrigger>
        </div>
        )
      } 
      return <></>     
    }}
  </IsLoggedIn>
))
