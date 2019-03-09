import React, {PureComponent} from 'react'
import {maxTitleLength, maxDescriptionLength} from '../../../../constants'
import ContentEditable from 'react-contenteditable'
import gql from 'graphql-tag';
import { Mutation, MutationFn } from 'react-apollo';
import {withRouter, RouteComponentProps} from 'react-router-dom'

type PathParamsType = {
    id: string;
  };
  type CmpProps = RouteComponentProps<PathParamsType> & {
   
  };
interface CmpStates {
    title: string
    description: string
    body: string
    titleErr: boolean
    descriptionErr: boolean   
}

export const ADD_ARTICLE = gql`  
    mutation AddArticle($title: String!, $description: String!, $body: String) {
        addArticle(title: $title, description: $description, body: $body) {
            status
            message           
        }
    }   
`;

export default withRouter(class NewArticle extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state = {title: '', description: '', body: '', titleErr: false, descriptionErr: false}
    }
    private handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        let title: string = e.target.value
        if(title.length > maxTitleLength) title = title.substr(0, maxTitleLength)
        return this.setState({title})
    }
    private handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        let description: string = e.target.value
        if(description.length > maxDescriptionLength) description = description.substr(0, maxDescriptionLength)
        return this.setState({description})
    }   
    private handleChangeBody = (e: React.ChangeEvent<HTMLInputElement>): void => this.setState({body: e.target.value})    
    private handleSubmit = (callback: MutationFn): void => {
        const {title, description, body} = this.state
        title.length > 0 ? this.setState({titleErr: false}) : this.setState({titleErr: true})
        description.length > 0 ? this.setState({descriptionErr: false}) : this.setState({descriptionErr: true})
        if(title.length <= 0 &&  description.length <= 0) return 
        callback({variables: {title, description, body}})   
    }
    render () {
        const {title, description, body, titleErr, descriptionErr } = this.state
        return (
            <Mutation mutation={ADD_ARTICLE}
             onCompleted={({addArticle}) => {
                 console.log(addArticle)
                if(addArticle && addArticle.status) return this.props.history.push("/cabinet")
             }}>
            {(addArticle, { data, loading, error }) => {
                return (
                <div className="cabinet__new-article">
                    <header>                    
                        <textarea className={`${titleErr && 'textarea-error'}`} disabled={loading}
                        placeholder="Заголовок..." value={title} onChange={this.handleChangeTitle}/>
                        <p>Символов: {title.length} из {maxTitleLength}</p>
                        {titleErr && <p>Заполните заголовок!</p>} 
                    </header>
                    <article>
                        <div className="description">
                            <textarea className={`${descriptionErr && 'textarea-error'}`} disabled={loading}
                            placeholder="Описание..." value={description} onChange={this.handleChangeDescription}/>
                            <p>Символов: {description.length} из {maxDescriptionLength}</p>
                            {descriptionErr && <p>Заполните описание!</p>} 
                        </div>
                        <div className="body">
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
