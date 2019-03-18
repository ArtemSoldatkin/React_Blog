import React, {memo} from 'react'
import { MutationFn} from 'react-apollo'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import { NewArticle, NewReview } from '../../../../types';
import EditArticle from './article'
import EditReview from './review'

type PathParamsType = {
    id: string   
}

interface CmpProps extends RouteComponentProps<PathParamsType> {
    id: string
    data: NewArticle | NewReview
    typeAction: 'article' | 'review'   
    handleConfirm: (target: EventTarget, callback: MutationFn, variables: any) => void
}
interface CmpStates {}

export default withRouter(memo((props: CmpProps) => (
            <div>
                {props.typeAction === 'article' ? 
                    <EditArticle  
                    article={props.data as NewArticle}
                    id={props.id}
                    handleConfirm={props.handleConfirm}
                    /> 
                : 
                    <EditReview 
                    review={props.data as NewReview}
                    id={props.id}
                    handleConfirm={props.handleConfirm}
                    />}
            </div>
        )
 ))
 