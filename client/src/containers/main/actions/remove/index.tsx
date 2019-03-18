import React, {PureComponent} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Mutation, MutationFn} from 'react-apollo'
import {REMOVE_ARTICLE} from '../../../../queries/article'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {Article, Reviews } from "../../../../types";

import RemoveArticle from './article'
import RemoveReview from './review'

type PathParamsType = {
    id: string;
  };

interface CmpProps extends RouteComponentProps<PathParamsType> {
    id: string
    typeAction: 'article' | 'review'
    handleConfirm: (target: EventTarget, callback: MutationFn, variables: any) => void
    onChange?: (data: Article | Reviews ) => void  
}
interface CmpStates {}

export default withRouter(class ActionRemove extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {}
    }   
    render () {
        const {typeAction, id, handleConfirm} = this.props
        return (
            <div>
                {typeAction === 'article' ? 
                    <RemoveArticle 
                    id={id}
                    handleConfirm={handleConfirm}
                    /> 
                : 
                    <RemoveReview                 
                    id={id}
                    handleConfirm={handleConfirm}
                    />}
            </div>
        )
    }
})
