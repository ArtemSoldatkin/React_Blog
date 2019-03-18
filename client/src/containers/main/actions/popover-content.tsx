import React, {  PureComponent } from "react";
import { Popover, Overlay} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUndo,faEdit} from "@fortawesome/free-solid-svg-icons";
import ActionRemove from './remove'
import ActionEdit from './edit'
import { MutationFn } from "react-apollo";
import { NewArticle,NewReview, Article, Reviews } from "../../../types";

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
interface CmpStates {
  callback: MutationFn | undefined
    show: boolean;
    target: any;
    variables: any
}

export default class PopoverContent extends PureComponent<CmpProps, CmpStates> {
  constructor(props: CmpProps){
    super(props)
    this.state = { show: false, target: undefined, callback: undefined, variables:undefined };
  }
  isUnmounted = false
  componentWillUnmount ( ) { this.isUnmounted = true}
  private handleEdit = (): void => this.props.setEdited(true);
    private handleUndo = (): void => {
      this.props.clear()   
      this.handleCancel()     
      //this.props.setEdited(false)  
       
    }
    private handleConfirm = (target: EventTarget, callback: MutationFn, variables: any) => {
        this.setState({show: true, target,  callback, variables} )
    }
    private handleOK = async(): Promise<void> => {
        this.state.callback && await this.state.callback(this.state.variables)
        this.handleCancel()
    }
    private handleCancel = () => {
      if(this.isUnmounted) return 
      this.setState({ show: false, callback: undefined, variables: undefined, target: undefined });
      this.props.setEdited(false)  
      //this.props.clear()  
    }
  render () {
   
    const { show, target } = this.state
    const {id, isEditing, data, typeAction} = this.props
    
    return (
      <div className="main_actions__popover_content">
        {isEditing ? (
          <div>
            <span className="button" onClick={this.handleUndo}>
              <FontAwesomeIcon icon={faUndo} className="icon" />
              <p className="text">Отменить</p>
            </span>
            <ActionEdit id={id} data={data} handleConfirm={this.handleConfirm} typeAction={typeAction}/>
          </div>              
        ) : (
          <span className="button" onClick={this.handleEdit}>
            <FontAwesomeIcon icon={faEdit} className="icon" />
            <p className="text">Редактировать</p>
          </span>
        )}
        <ActionRemove id={id} handleConfirm={this.handleConfirm}  typeAction={typeAction}/>
        <Overlay
        show={show}
        target={target}
        placement={"top"}
        rootCloseEvent="mousedown"
        rootClose={true}
        onHide={this.handleCancel}
        >
          <Popover
          id={`${typeAction}__${id}-confirm`}
          placement="top"
          title="Уверены?"
          className="main_actions__popover_confirm"
          >
            <span className="button button-ok" onClick={this.handleOK}>
              Да
            </span>
            <span className="button button-cancel" onClick={this.handleCancel}>
              Нет
            </span>
          </Popover>
        </Overlay>
      </div>
    )
  }
}
