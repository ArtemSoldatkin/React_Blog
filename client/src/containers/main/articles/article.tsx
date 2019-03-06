import React, {memo} from 'react'
import {Card} from 'react-bootstrap'
import Moment from 'react-moment';
import {Link} from 'react-router-dom'

import {Article} from './index'

interface CmpProps {
    article: Article
}

export default memo(({article}: CmpProps) => {
    const likes = article.vote ? article.vote.filter(vote => vote.value) : []
    const dislikes = article.vote ? article.vote.filter(vote => !vote.value) : []

return (    
        <Card className="articles__article">
            <Card.Header>
                <div>
                    <Link to={`/user/${/*article.user.id*/5}`}>
                        <img src={String(/*article.user.avatar*/'')} />
                        <p>{article.user && article.user.login}</p>   
                    </Link>            
                </div>
                <div>
                    <Link to={`/article/${/*article.id*/5}`}>
                        {article.title}
                    </Link>
                </div>
            </Card.Header>
            <Card.Body>
                <div>
                    <Link to={`/article/${article.id}`}>
                        {article.description}
                    </Link>
                </div>
            </Card.Body> 
            <Card.Footer>
                <div>
                    <p>Likes: {likes.length}</p>
                    <p>Dislikes: {dislikes.length}</p>
                </div>
                <div>
                    <p>{article.isEdited ? "Отредактирована:" : "Создана:"}</p>
                    <Moment format="DD.MM.YYYY HH:mm" date={article.created} />
                </div>
            </Card.Footer>
        </Card>    
)
})