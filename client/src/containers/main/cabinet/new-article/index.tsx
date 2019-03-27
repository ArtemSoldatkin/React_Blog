import React, {memo, useState} from 'react'
import {Mutation,MutationFn} from 'react-apollo'
import {RouteComponentProps} from 'react-router-dom'
import {ADD_ARTICLE} from '../../../../queries/article'
import Loading from '../../../../components/loading'
import ErrorHandler from '../../../../components/error-handler'
import CustomTextArea from '../../../../components/text-area'
import ContentEditable from 'react-contenteditable'
import {maxTitleLength, maxDescriptionLength} from '../../../../constants'
import {isString} from '../../../../types'
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag'
import './style.scss'

//---TEMP
interface T_AddArticle {
    addArticle: {
        message: string
        status: string
    }   
}
class AddArticle extends Mutation<T_AddArticle>{}
//--- / TEMP

interface CmpProps extends RouteComponentProps { }

export default memo((props: CmpProps) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [isValid, setIsValid] = useState<undefined | boolean>(undefined)
    const checkParams = () => isString(title) && isString(description) && isString(body)    
    const handleSubmit = (mtn: MutationFn) => mtn({variables:{ title, description, body }})
    return (
        <AddArticle mutation={ADD_ARTICLE}>
            {(addArticle, { data, loading, error }) => { 
                if(!loading && data && data.addArticle && data.addArticle.status) {                 
                    props.history.push("/cabinet")
                }
                return (                    
                    <div id="cabinet__new_article">
                        <Loading loading={loading}>
                            <form onSubmit={e => {
                                e.preventDefault()                                
                                checkParams() ? handleSubmit(addArticle) : setIsValid(false)                            
                            } }>
                                <CustomTextArea name="Заголовок" loading={loading}
                                maxLength={maxTitleLength} onChange={val => setTitle(val)} isValid={isValid} />  
                                <CustomTextArea name="Описание" loading={loading}
                                maxLength={maxDescriptionLength} onChange={val => setDescription(val)} isValid={isValid} />                           
                                <div className="body">
                                    <p className="label">Статья</p>
                                    <ContentEditable                     
                                    html={body} 
                                    disabled={loading}      
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value)} 
                                    tagName='article' 
                                    />
                                </div>
                                <button type="submit">Сохранить</button>                           
                            </form>                        
                        </Loading>
                        <ErrorHandler error={error} data={data} name='addArticle' />                      
                    </div>                  
                )
            }}
        </AddArticle>
    )
})
