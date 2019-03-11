import React, {PureComponent} from 'react'
import ContentEditable from 'react-contenteditable'
import { Mutation, MutationFn } from 'react-apollo';
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {ADD_ARTICLE} from '../../../../queries/article'
import {maxTitleLength, maxDescriptionLength} from '../../../../constants'

import CustomTextArea from '../../../../components/text-area'

type PathParamsType = {
    id: string;
  };
type CmpProps = RouteComponentProps<PathParamsType> & {   
};
interface CmpStates {
    title: string
    description: string
    body: string
    isValid: boolean | undefined
}

export default withRouter(class NewArticle extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {title: '', description: '', body: '', isValid: undefined}
    }
    private handleChangeTitle = (title: string): void => this.setState({title})   
    private handleChangeDescription = (description: string): void => this.setState({description})
    private handleChangeBody = (e: React.ChangeEvent<HTMLInputElement>): void => this.setState({body: e.target.value})    
    private handleSubmit = (callback: MutationFn): void => {
        const {title, description, body} = this.state        
        if(title.trim().length <= 0 &&  description.trim().length <= 0)return this.setState({isValid: false})
        this.setState({isValid: true})
        callback({variables: {title, description, body}})   
    }
    render () {
        const {body, isValid} = this.state
        return (
            <Mutation mutation={ADD_ARTICLE}
             onCompleted={({addArticle}) => {                
                if(addArticle && addArticle.status) return this.props.history.push("/cabinet")
             }}>
            {(addArticle, { data, loading, error }) => {                
                return (
                <div className="cabinet__new-article">
                    <header>                    
                        <CustomTextArea name="Заголовок" loading={loading}
                        maxLength={maxTitleLength} onChange={this.handleChangeTitle} isValid={isValid} />
                    </header>
                    <article>
                        <div className="description">
                            <CustomTextArea name="Описание" loading={loading}
                            maxLength={maxDescriptionLength} onChange={this.handleChangeDescription} isValid={isValid} />                           
                        </div>
                        <div className="body">
                            <p>Статья</p>
                            <ContentEditable                     
                            html={body} 
                            disabled={loading}      
                            onChange={this.handleChangeBody} 
                            tagName='article' 
                            />
                        </div>
                    </article>
                    <footer>
                        <button onClick={() => this.handleSubmit(addArticle)} disabled={loading}>
                            Сохранить
                        </button>                        
                        {error && <p>Ошибка</p>}
                    </footer>
                </div>
                )
            }}
            </Mutation>
        )
    }
})
