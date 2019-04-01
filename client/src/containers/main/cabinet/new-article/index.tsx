import React, {memo, useState} from 'react'
import {MutationFn} from 'react-apollo'
import {RouteComponentProps} from 'react-router-dom'
import ContentEditable from 'react-contenteditable'
import {ADD_ARTICLE, AddArticle} from '../../../../queries/article'
import {maxTitleLength, maxDescriptionLength} from '../../../../constants'
import {isStr, optBool} from '../../../../types'
import Loading from '../../../../components/loading'
import ErrorHandler from '../../../../components/error-handler'
import CustomTextArea from '../../../../components/textarea'
import './style.scss'

interface CmpProps extends RouteComponentProps { }

export default memo((props: CmpProps) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [isValid, setIsValid] = useState<optBool>(undefined)
    const checkParams = () => isStr(title) && isStr(description) && isStr(body)    
    const handleSubmit = (mtn: MutationFn) => mtn({variables:{ title, description, body }})
    return (
        <AddArticle mutation={ADD_ARTICLE}                  
        onCompleted={data => data && data.addArticle && data.addArticle.success && props.history.push('/')}
        >
            {(addArticle, { loading, error }) => {               
                return (                    
                    <div className="new_article">
                        <Loading loading={loading}>
                            <form className="new_article__form"
                            onSubmit={e => {
                                e.preventDefault()                                
                                checkParams() ? handleSubmit(addArticle) : setIsValid(false)                            
                            } }>
                                <CustomTextArea name="Заголовок" loading={loading}
                                maxLength={maxTitleLength} onChange={val => setTitle(val)} isValid={isValid} />  
                                <CustomTextArea name="Описание" loading={loading}
                                maxLength={maxDescriptionLength} onChange={val => setDescription(val)} isValid={isValid} />                           
                                <div className="new_article__b">
                                    <p className="new_article__lbl">Статья</p>
                                    <ContentEditable                     
                                    html={body} 
                                    disabled={loading}      
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value)} 
                                    tagName='article' 
                                    className="new_article__itx"
                                    />
                                    {isValid === false && body.length <= 0 && <p className="new_article__err">Заполните "Cтатью"!</p>}
                                </div>
                                <button className="new_article__btn" type="submit">Сохранить</button>                           
                            </form>                        
                        </Loading>
                        <ErrorHandler error={error} />                      
                    </div>                  
                )
            }}
        </AddArticle>
    )
})
