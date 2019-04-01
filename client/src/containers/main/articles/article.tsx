import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import {Article} from '../../../types'
import User from '../../../components/user-info'
import CreatedDate from '../../../components/created-date'
import VotesForm from '../votes'

interface CmpProps {
    article: Article
}

export default memo(({article}: CmpProps) => (    
    <div className="article_card">
        <header className="article_card__h">
            <User user={article.user} link name /> 
            <Link to={`/article/${article.id}`}>
                <div className="article_card__t">
                    {article.title}                    
                </div>
            </Link>
        </header>
        <Link to={`/article/${article.id}`}>
            <article className="article_card__b">            
                {article.description}                  
            </article> 
        </Link>   
        <footer className="article_card__f">
            <VotesForm id={article.id} type="Article" votes={article.votes}/>            
            <CreatedDate isEdited={article.isEdited} created={article.created}/>
        </footer>
    </div>     
))
