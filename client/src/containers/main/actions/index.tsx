import React, { memo } from "react";
import { Popover, OverlayTrigger} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import { NewArticle,NewReview, Article, Reviews, User } from "../../../types";
import {IS_LOGGED_IN} from '../../../queries/user'
import { Query } from 'react-apollo';
import PopoverContent from './popover-content'
import './style.scss'

interface CmpProps {
    data: NewArticle | NewReview    
    id: string
    userID: string
    isEditing: boolean;
    setEdited: (val: boolean) => void;
    typeAction: 'article' | 'review' 
    onChange?: (data: Article | Reviews ) => void  
    clear: () => void
}

export default memo(({id, data: inputData ,isEditing, typeAction, userID, setEdited, onChange,clear}: CmpProps) => (
        
          <Query query={IS_LOGGED_IN}>
            {({ data: {user} }) => {   
              //const user: User | undefined = data && data.user && JSON.parse(data.user)
              if(!user) return <div></div>
              if(user.id !== userID) return <div></div>
              return (
                <div className="main_actions">
                  <OverlayTrigger
                  trigger="click"                  
                  placement="left-start"
                  overlay={
                  <Popover id={`${typeAction}__${id}`} className="modal-block" placement="left-start">    
                    <PopoverContent 
                      data={inputData}    
                      id={id}
                      userID={userID}
                      isEditing={isEditing}
                      setEdited={setEdited}
                      typeAction={typeAction} 
                      onChange={onChange}
                      clear={clear}
                    />
                  </Popover >}>
                  <span className="act-button">
                    <FontAwesomeIcon icon={faEllipsisV} className="button__icon" />           
                  </span>
                  </OverlayTrigger>
                </div>
              )
            }}
          </Query>
        ))
