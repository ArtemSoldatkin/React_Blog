import React, {memo} from 'react'

interface CmpProps {
    isEditing: boolean
    title: string
    maxTitleLength: number
    handleTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default memo(({isEditing, title, maxTitleLength, handleTitle}: CmpProps) => (
    <div className="article-card__header">
        {isEditing ? 
            <div className="title">
                <textarea className="article-card__textarea title__text" value={String(title)} onChange={handleTitle}/>
                <p className="title__counter">Символов: {title.length} из {maxTitleLength}</p>
            </div>                        
        :
            <p className="title">{title}</p>
        }                    
    </div>
))
