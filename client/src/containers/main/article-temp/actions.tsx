import React, {PureComponent} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUndo, faSave } from '@fortawesome/free-solid-svg-icons'
import {Popover, Button, Overlay } from 'react-bootstrap'
interface CmpProps {}
interface CmpStates {
    isEditing: boolean
    show: boolean
    target: any 
}

export default class Actions extends PureComponent<CmpProps, CmpStates> {
    constructor (props: CmpProps) {
        super(props)
        this.state = { isEditing: false, show: false, target: undefined}
    }
    private handleEdit = (): void => this.setState({isEditing: true}) 
    private handleUndo = (): void => this.setState({isEditing: false}) 
    private handleConfirm = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.persist()
        this.setState({target: e.currentTarget,  show: true})
    }
    private handleOK = (): void => console.log('ok')
    private handleCancel = (): void => this.setState({show: false})
    render () {
        const {isEditing, show, target} = this.state
        return (
            <div className="action__actions"> 
                {isEditing ?
                    [<span className="button" key="undo" onClick={this.handleConfirm}>
                        <FontAwesomeIcon icon={faUndo} className="button__icon" /> 
                        <p className="button__text">Отменить</p>
                    </span>,
                    <span className="button" key="save" onClick={this.handleConfirm}>
                        <FontAwesomeIcon icon={faSave} className="button__icon" /> 
                        <p className="button__text">Сохранить</p>
                    </span>]
                :
                    <span className="button" onClick={this.handleEdit}>
                        <FontAwesomeIcon icon={faEdit} className="button__icon" /> 
                        <p className="button__text">Редактировать</p>
                    </span>
                }
                <span className="button" onClick={this.handleConfirm}>
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
    }
}
