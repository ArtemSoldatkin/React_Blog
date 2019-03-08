import React, {PureComponent} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUndo, faSave } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import { render } from 'react-dom';

//--
import Actions from './actions'

interface CmpProps {}
interface CmpStates {
    isEditing: boolean
}

export default class Article extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state={ isEditing: false }
    }
    private handleEdit = (): void => this.setState({isEditing: true})
    private handleUndo = (): void => this.setState({isEditing: false})
    render() {
    const {isEditing} = this.state
    return (
        <div>
            {/*1. use query for check userid with article user id */}
            <Actions />
            {/*1. end */}
            <div className="article">
                <div className="article__header">
                    <div className="title">title</div>
                    <div className="user">User</div>
                    <div className="date"></div>
                    <div className="description"></div>
                </div>
                <div className="article__body">
                    HTML BODY
                </div>
                <div className="article__footer">
                    Like and dislike (mutation)
                </div>
            </div>
            {/* Review */}
        </div>
)}}
