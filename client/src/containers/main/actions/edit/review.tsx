import React, {PureComponent} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {Mutation, MutationFn} from 'react-apollo'
import {EDIT_REVIEW} from '../../../../queries/review'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {  NewReview } from '../../../../types';

type PathParamsType = {
    id: string   
}

interface CmpProps extends RouteComponentProps<PathParamsType> {
    id: string
    review: NewReview 
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
        const {body} = this.props.review
        const variables = {variables: {id, body}}
        this.props.handleConfirm(target, callback, variables)
    }
    render () {
        return (
            <Mutation mutation={EDIT_REVIEW}>
                {(editReview, {data, loading, error}) => (
                    <span
                        className="button"
                        onClick={e => this.handleConfirm(e, editReview)}
                    >
                        <FontAwesomeIcon icon={faSave} className="icon" />
                        <p className="text">Сохранить</p>
                  </span>
                )}            
            </Mutation>
        )
    }
})
