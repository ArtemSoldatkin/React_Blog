import React, {memo, useState} from 'react'
import {Mutation,MutationFn} from 'react-apollo'
import {RouteComponentProps} from 'react-router-dom'
import {ADD_ARTICLE} from '../../../../queries/article'
import Loading from '../../../../components/loading'
import Info from '../../../../components/info'
import CustomTextArea from '../../../../components/text-area'
import ContentEditable from 'react-contenteditable'
import {maxTitleLength, maxDescriptionLength} from '../../../../constants'
import {isString} from '../../../../types'
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag'
import './style.scss'

const handleSubmit = (mtn: MutationFn, title: string, description: string, body: string) => mtn({variables:{ title, description, body }})
const checkParams = (title: string, description: string, body: string) => isString(title) &&  isString(description) && isString(body)


interface eh_CmpProps {
    error: ApolloError | undefined
    data: any
    name: string
}

const ErrorHandler = memo(({error, data, name}: eh_CmpProps) => {
    if(error) return <Info type="error" /> 
    if(!data) return <></> 
    if(!data[name]) return <></>
    if(!data[name].message && data[name].status === null) return <Info type="error" /> 
    if(!data[name].status) return <Info type="error" message={data[name].message}/>
    return <Info type="success" message={data[name].message}/>
}) 

interface CmpProps extends RouteComponentProps { }

export default memo((props: CmpProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState<string>('')
    const [isValid, setIsValid] = useState<undefined | boolean>(undefined)
    return (
        <Mutation mutation={ADD_ARTICLE}>
            {(addArticle, { data, loading, error, client }) => { 
                if(data && data.addArticle && data.addArticle.article) {                 
                    props.history.push("/cabinet")
                }
                return (                    
                    <div id="cabinet__new_article">
                        <Loading loading={loading}>
                            <form onSubmit={e => {
                                e.preventDefault()
                                checkParams(title, description, body) ? handleSubmit( addArticle, title, description, body) : setIsValid(false)                            
                            } }>
                                <CustomTextArea name="Заголовок" loading={loading}
                                maxLength={maxTitleLength} onChange={setTitle} isValid={isValid} />  
                                <CustomTextArea name="Описание" loading={loading}
                                maxLength={maxDescriptionLength} onChange={setDescription} isValid={isValid} />                           
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
        </Mutation>
    )
})
