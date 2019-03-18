import React, {memo} from 'react'
import Actions from '../../actions'
import {maxTitleLength} from '../../../../constants'
import { NewArticle } from '../../../../types';
interface CmpProps {
    isEditing: boolean
    title: string
    setTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void

    id: string
    newArticle: NewArticle
    
    userID: string
    setEditing: (isEdited: boolean) => void
    clear: () => void
    
}

export default memo(({clear, isEditing, title, setTitle, id, newArticle, userID, setEditing}: CmpProps) => (
    <header>
        {isEditing ? 
            <div className="title">
                <textarea className="article-card__textarea title__text" 
                value={newArticle.title ? newArticle.title : title} onChange={setTitle}/>
                <p className="title__counter">Символов: {newArticle.title ? newArticle.title.length : title.length} из {maxTitleLength}</p>
            </div>                        
        :
            <p className="title">{newArticle.title ? newArticle.title : title}</p>
        }  
        <Actions id={id} typeAction='article' data={newArticle} userID= {userID}
            isEditing={isEditing} setEdited={setEditing} clear={clear}/>                   
    </header>
))
