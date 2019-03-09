import React, {PureComponent} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUndo, faSave } from '@fortawesome/free-solid-svg-icons'
import {Popover, Button, Overlay } from 'react-bootstrap'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
interface CmpProps {
     isEditing: boolean
     setEdited: (val: boolean) => void
     userID: string
}
interface CmpStates {
    callback: () => void
    show: boolean
    target: any 
}

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {    
    user @client 
  }
`;

export default class Actions extends PureComponent<CmpProps, CmpStates> {
    constructor (props: CmpProps) {
        super(props)
        this.state = { show: false, target: undefined, callback: ()=>{}}
    }
    private handleEdit = (): void => this.props.setEdited(true) 
    private handleUndo = (): void => this.props.setEdited(false)
    private handleConfirm = (e: React.MouseEvent<HTMLSpanElement>, callback: ()=> void): void => {
        e.persist()
        //must await this!!!
        this.setState({target: e.currentTarget,  show: true,callback: callback})
    }
    private handleOK = (): void => (this.state.callback(), this.setState({show: false}))
    private handleCancel = (): void => this.setState({show: false})
    render () {
        const {show, target} = this.state
        const {isEditing, userID} = this.props
        return (
            <Query query={IS_LOGGED_IN}>
                {({ data }) => {            
                const user = data && data.user && JSON.parse(data.user) 
                if(user.id !== userID) return <div className="action__actions"></div>                             
                return (
                    <div className="action__actions"> 
                        {isEditing ?
                            [<span className="button" key="undo" onClick={(e) => this.handleConfirm(e, this.handleUndo)}>
                                <FontAwesomeIcon icon={faUndo} className="button__icon" /> 
                                <p className="button__text">Отменить</p>
                            </span>,
                            <span className="button" key="save" onClick={(e) => this.handleConfirm(e, this.handleUndo)}>
                                <FontAwesomeIcon icon={faSave} className="button__icon" /> 
                                <p className="button__text">Сохранить</p>
                            </span>]
                        :
                            <span className="button" onClick={this.handleEdit}>
                                <FontAwesomeIcon icon={faEdit} className="button__icon" /> 
                                <p className="button__text">Редактировать</p>
                            </span>
                        }
                        <span className="button" onClick={(e) => this.handleConfirm(e, this.handleUndo)}>
                            <FontAwesomeIcon icon={faTrash} className="button__icon" /> 
                            <p className="button__text">Удалить</p>
                        </span>
                        <Overlay               
                        show={show}
                        target={target}
                        placement={"top"} 
                        rootCloseEvent="mousedown"
                        rootClose={true}
                        onHide={this.handleCancel}
                        >  
                            <Popover id="confirm" placement="top" title="Уверены?" className="popover">
                                <span className="button button-ok" onClick={this.handleOK}>Да</span>
                                <span className="button button-cancel" onClick={this.handleCancel}>Нет</span>
                            </Popover>
                        </Overlay>
                    </div>
                )
                }}
            </Query>

             
        )
    }
}


/*
<div className="action__actions"> 
                {isEditing ?
                    [<span className="button" key="undo" onClick={(e) => this.handleConfirm(e, this.handleUndo)}>
                        <FontAwesomeIcon icon={faUndo} className="button__icon" /> 
                        <p className="button__text">Отменить</p>
                    </span>,
                    <span className="button" key="save" onClick={(e) => this.handleConfirm(e, this.handleUndo)}>
                        <FontAwesomeIcon icon={faSave} className="button__icon" /> 
                        <p className="button__text">Сохранить</p>
                    </span>]
                :
                    <span className="button" onClick={this.handleEdit}>
                        <FontAwesomeIcon icon={faEdit} className="button__icon" /> 
                        <p className="button__text">Редактировать</p>
                    </span>
                }
                <span className="button" onClick={(e) => this.handleConfirm(e, this.handleUndo)}>
                    <FontAwesomeIcon icon={faTrash} className="button__icon" /> 
                    <p className="button__text">Удалить</p>
                </span>
                <Overlay               
                show={show}
                target={target}
                placement={"top"} 
                rootCloseEvent="mousedown"
                rootClose={true}
                onHide={this.handleCancel}
                >  
                    <Popover id="confirm" placement="top" title="Уверены?" className="popover">
                        <span className="button button-ok" onClick={this.handleOK}>Да</span>
                        <span className="button button-cancel" onClick={this.handleCancel}>Нет</span>
                    </Popover>
                </Overlay>
            </div>         
*/