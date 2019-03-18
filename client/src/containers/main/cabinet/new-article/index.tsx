import React, {PureComponent} from 'react'
import ContentEditable from 'react-contenteditable'
import { Mutation, MutationFn } from 'react-apollo';
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {isString} from '../../../../types'
import {ADD_ARTICLE} from '../../../../queries/article'
import {maxTitleLength, maxDescriptionLength} from '../../../../constants'
import Loading from '../../../../components/loading'
import Info from '../../../../components/info'
import CustomTextArea from '../../../../components/text-area'
import './style.scss'

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
    private setTitle = (title: string) => this.setState({title})   
    private setDescription = (description: string) => this.setState({description})
    private setBody = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({body: e.target.value})    
    private handleSubmit = (callback: MutationFn) => {
        const {title, description, body} = this.state        
        if(!isString(title) &&  !isString(title))return this.setState({isValid: false})
        this.setState({isValid: true}, () => callback({variables: {title, description, body}}))   
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
                        <div id="cabinet__new_article">
                            <Loading loading={loading}>
                                <article>                   
                                    <CustomTextArea name="Заголовок" loading={loading}
                                    maxLength={maxTitleLength} onChange={this.setTitle} isValid={isValid} />  
                                    <CustomTextArea name="Описание" loading={loading}
                                    maxLength={maxDescriptionLength} onChange={this.setDescription} isValid={isValid} />                           
                                    <div className="body">
                                        <p className="label">Статья</p>
                                        <ContentEditable                     
                                        html={body} 
                                        disabled={loading}      
                                        onChange={this.setBody} 
                                        tagName='article' 
                                        />
                                    </div>
                                </article>
                            </Loading>
                            <footer>
                                <button onClick={() => this.handleSubmit(addArticle)} disabled={loading}>
                                    Сохранить
                                </button>
                            </footer>                        
                            {data && data.addArticle ? (
                                data.addArticle.status ? 
                                <Info type="success" message={data.addArticle.message}/> 
                                : 
                                <Info type="error" message={data.addArticle.message}/>
                            ) 
                            : 
                            (error && <Info type="error" />)}
                        </div>                  
                )
            }}
            </Mutation>
        )
        }
})
