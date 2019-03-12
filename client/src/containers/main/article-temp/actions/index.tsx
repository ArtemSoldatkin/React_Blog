import React, { PureComponent } from "react";
import { Popover, Overlay } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUndo,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import ActionRemove from './remove'
import ActionEdit from './edit'
import { MutationFn } from "react-apollo";
import { NewArticle } from "../../../../types";



interface CmpProps {
    article: NewArticle
    id: string
    isEditing: boolean;
    setEdited: (val: boolean) => void;
   
}
interface CmpStates {
    callback: MutationFn | undefined
    show: boolean;
    target: any;
    variables: any
}

export default class Actions extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props);
        this.state = { show: false, target: undefined, callback: undefined, variables:undefined };
    }   
    private handleEdit = (): void => this.props.setEdited(true);
    private handleUndo = (): void => {
      this.handleCancel()     
      this.props.setEdited(false)      
    }
    private handleConfirm = (target: EventTarget, callback: MutationFn, variables: any) => {
        this.setState({show: true, target,  callback, variables} )
    }
    private handleOK = async(): Promise<void> => {
        this.state.callback && await this.state.callback(this.state.variables)
        this.handleCancel()
    }
    private handleCancel = (): void => this.setState({ show: false, callback: undefined, variables: undefined, target: undefined });
    render() {
        const { show, target } = this.state
        const {id, isEditing, article} = this.props

        return (
        <div className="action__actions">    
             {isEditing ? (
                [
                  <span
                    className="button"
                    key="undo"
                    onClick={this.handleUndo}
                  >
                    <FontAwesomeIcon icon={faUndo} className="button__icon" />
                    <p className="button__text">Отменить</p>
                  </span>,
                  <ActionEdit id={id} article={article} handleConfirm={this.handleConfirm}/>
                  
                ]
              ) : (
                <span className="button" onClick={this.handleEdit}>
                  <FontAwesomeIcon icon={faEdit} className="button__icon" />
                  <p className="button__text">Редактировать</p>
                </span>
              )
            }
            <ActionRemove id={id} handleConfirm={this.handleConfirm}/>
            <Overlay
            show={show}
            target={target}
            placement={"top"}
            rootCloseEvent="mousedown"
            rootClose={true}
            onHide={this.handleCancel}
            >
            <Popover
                id="confirm"
                placement="top"
                title="Уверены?"
                className="popover"
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
        );
    }
    }


/*import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faUndo,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import { Popover, Overlay } from "react-bootstrap";

import ActionRemove from './remove'
import article from "../../articles/article";


interface CmpProps {
  isEditing: boolean;
  setEdited: (val: boolean) => void;
}
interface CmpStates {
  callback: () => void;
  show: boolean;
  target: any;
}

export default class Actions extends PureComponent<CmpProps, CmpStates> {
  constructor(props: CmpProps) {
    super(props);
    this.state = { show: false, target: undefined, callback: () => {} };
  }
  private handleEdit = (): void => this.props.setEdited(true);
  private handleUndo = (): void => this.props.setEdited(false);
  private handleConfirm = (
    e: React.MouseEvent<HTMLSpanElement>,
    callback: () => void
  ): void => {
    e.persist();
    //must await this!!!
    this.setState({ target: e.currentTarget, show: true, callback: callback });
  };
  private handleOK = (): void => (
    this.state.callback(), this.setState({ show: false })
  );
  private handleCancel = (): void => this.setState({ show: false });
  render() {
    const { show, target } = this.state;
    const { isEditing } = this.props;
    return (
      <div className="action__actions">
        {isEditing ? (
          [
            <span
              className="button"
              key="undo"
              onClick={e => this.handleConfirm(e, this.handleUndo)}
            >
              <FontAwesomeIcon icon={faUndo} className="button__icon" />
              <p className="button__text">Отменить</p>
            </span>,
            <span
              className="button"
              key="save"
              onClick={e => this.handleConfirm(e, this.handleUndo)}
            >
              <FontAwesomeIcon icon={faSave} className="button__icon" />
              <p className="button__text">Сохранить</p>
            </span>
          ]
        ) : (
          <span className="button" onClick={this.handleEdit}>
            <FontAwesomeIcon icon={faEdit} className="button__icon" />
            <p className="button__text">Редактировать</p>
          </span>
        )}
        <ActionRemove id={article.id}/>
        <Overlay
          show={show}
          target={target}
          placement={"top"}
          rootCloseEvent="mousedown"
          rootClose={true}
          onHide={this.handleCancel}
        >
          <Popover
            id="confirm"
            placement="top"
            title="Уверены?"
            className="popover"
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
    );
  }
}
*/