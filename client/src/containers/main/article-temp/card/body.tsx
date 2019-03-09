import React, {memo} from 'react'
import {Image} from 'react-bootstrap'
import Moment from 'react-moment'
import ContentEditable from 'react-contenteditable'

interface CmpProps {
    isEditing: boolean
    user: {id: string, login: string, avatar: string}
    isEdited: boolean
    created: string
    description: string
    handleDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    maxDescriptionLength: number
    contentEditable: React.RefObject<HTMLElement>
    body: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default memo(({isEditing, user, isEdited, created, description, handleDescription,maxDescriptionLength, contentEditable, body, handleChange}: CmpProps) => (
    <div className="article-card__body">
        <div className="info">
            <div className="info__unchanged">
                <div className="user">
                    <Image className="user__avatar" src={user.avatar} rounded />
                    <p className="user__login">{user.login}</p>
                </div>
                <div className="date">
                    <p className="date__text">{isEdited ? "Отредактирована:" : "Создана:"}</p>
                    <Moment format="DD.MM.YYYY HH:mm" date={new Date(created)} />
                </div>
            </div>
            {isEditing ? 
                <div className="description">
                    <textarea className="article-card__textarea description__text" value={description} onChange={handleDescription}/>
                    <p className="description__counter">Символов: {description.length} из {maxDescriptionLength}</p>
                </div>                        
            :
                <p className="description">{description}</p>
             }    
        </div>                    
        <div className="main">
            <ContentEditable
                innerRef={contentEditable}
                html={body} 
                disabled={!isEditing}     
                onChange={handleChange} 
                tagName='article' 
            />
        </div>
    </div>
))
