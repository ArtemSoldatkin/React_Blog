import React, {memo} from 'react'
import Moment from 'react-moment'
import ContentEditable from 'react-contenteditable'
import UserAvatar from '../../../../components/user-avatar'
import {maxDescriptionLength} from '../../../../constants'
import { NewArticle } from '../../../../types';

interface CmpProps {
    isEditing: boolean
    user: {id: string, login: string, avatar: string}
    isEdited: boolean
    created: string
    description: string
    setDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    newArticle: NewArticle
    body: string
    setBody: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default memo(({isEditing, user, isEdited, created, description, setDescription, body, setBody, newArticle}: CmpProps) => (
    <article>
        <div className="info">
            <div className="user-info">
                <UserAvatar user={user} />  
                <div className="login-date">
                    <p className="login">{user.login}</p>
                    <div className="date">
                        <p className="date__text">{isEdited ? "Отредактирована:" : "Создана:"}</p>
                        <Moment format="DD.MM.YYYY HH:mm" date={Number(created)} />
                    </div>
                </div>   
            </div>
            {isEditing ? 
                <div className="description">
                    <textarea className="article-card__textarea description__text" 
                    value={newArticle.description ? newArticle.description : description} 
                    onChange={setDescription}/>
                    <p className="description__counter">Символов: {newArticle.description ? newArticle.description.length : description.length} из {maxDescriptionLength}</p>
                </div>                        
            :
                <p className="description">{description}</p>
             }    
        </div>                    
        <div className="main">
            <ContentEditable               
                html={newArticle.body ? newArticle.body : body} 
                disabled={!isEditing}     
                onChange={setBody} 
                tagName='article' 
            />
        </div>
    </article>
))
