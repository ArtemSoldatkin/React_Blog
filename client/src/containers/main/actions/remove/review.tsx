import React, {PureComponent} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Mutation, MutationFn} from 'react-apollo'
import {REMOVE_REVIEW} from '../../../../queries/review'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {Article, Reviews } from "../../../../types";
type PathParamsType = {
    id: string;
  };

interface CmpProps extends RouteComponentProps<PathParamsType> {
    id: string
    handleConfirm: (target: EventTarget, callback: MutationFn, variables: any) => void
    onChange?: (data: Reviews ) => void 
}
interface CmpStates {}

export default withRouter(class ActionRemove extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {}
    }
    private handleConfirm = (e: React.MouseEvent<HTMLSpanElement>, callback: MutationFn):void => {
        const {target} = e
        const {id} = this.props
        const variables = {variables: {id}}
        this.props.handleConfirm(target, callback, variables)
    }
    render () {
        return (
            <Mutation mutation={REMOVE_REVIEW}
            onCompleted={({removeReview}) => {     
                removeReview && removeReview.reviews && this.props.onChange && this.props.onChange(removeReview.reviews)
            }}>
                {(removeReview, {data, loading, error}) => (
                    <span
                        className="button"
                        onClick={e => this.handleConfirm(e, removeReview)}
                    >
                        <FontAwesomeIcon icon={faTrash} className="icon" />
                        <p className="text">Удалить</p>
                  </span>
                )}            
            </Mutation>
        )
    }
})
