import React, {PureComponent} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {Mutation, MutationFn} from 'react-apollo'
import {EDIT_ARTICLE} from '../../../../queries/article'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import { NewArticle } from '../../../../types';

type PathParamsType = {
    id: string   
}

interface CmpProps extends RouteComponentProps<PathParamsType> {
    id: string
    article: NewArticle
    handleConfirm: (target: EventTarget, callback: MutationFn, variables: any) => void
}
interface CmpStates {}

export default withRouter(class ActionEdit extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {}
    }
    private handleConfirm = (e: React.MouseEvent<HTMLSpanElement>, callback: MutationFn):void => {
        const {target} = e
        const {id} = this.props
        const {title, description, body} = this.props.article
        const variables = {variables: {id, title, description, body}}
        this.props.handleConfirm(target, callback, variables)
    }
    render () {
        return (
            <Mutation mutation={EDIT_ARTICLE}>
                {(editArticle, {data, loading, error}) => (
                    <span
                        className="button"
                        onClick={e => this.handleConfirm(e, editArticle)}
                    >
                        <FontAwesomeIcon icon={faSave} className="button__icon" />
                        <p className="button__text">Сохранить</p>
                  </span>
                )}            
            </Mutation>
        )
    }
})
