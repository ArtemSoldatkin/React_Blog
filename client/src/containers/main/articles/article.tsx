import React, {memo} from 'react'
import {Card, Image} from 'react-bootstrap'
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import {Article} from './index'

interface CmpProps {
    article: Article
}

export default memo(({article}: CmpProps) => {
    const likes = article.vote ? article.vote.filter(vote => vote.value) : []
    const dislikes = article.vote ? article.vote.filter(vote => !vote.value) : []
    console.log('cr', article.created)
return (    
        <Card className="articles-article">
            <Card.Header className="articles-article__header" style={{padding: "5px"}}>
                <div className="user">
                    <Link to={`/user/${article.user.id}`}>
                        <Image className="user__avatar" src={String(article.user.avatar)} rounded  />
                        <p className="user__login">{article.user.login}</p>   
                    </Link>            
                </div>
                <div className="title">
                    <Link to={`/article/${/*article.id*/5}`}>
                        <div className="title__text">{article.title}</div>
                    </Link>
                </div>
            </Card.Header>
            <Card.Body className="articles-article__body">
                <div className="description">
                    <Link to={`/article/${article.id}`}>
                        <div className="description__text">{article.description}</div>
                    </Link>
                </div>
            </Card.Body> 
            <Card.Footer className="articles-article__footer" style={{padding: "5px"}}>
                <div className="info">
                    <FontAwesomeIcon icon={faThumbsUp} className="info__thumbs thumbs-like"/>
                    <p className="info__text text-like">{likes.length}</p>
                    <FontAwesomeIcon icon={faThumbsDown} className="info__thumbs thumbs-dislike"/>
                    <p className="info__text text-dislike">{dislikes.length}</p>
                </div>
                <div className="date">
                    <p className="date__text">{article.isEdited ? "Отредактирована:" : "Создана:"}</p>
                    <Moment format="DD.MM.YYYY HH:mm" date={Number(article.created)} />
                </div>
            </Card.Footer>
        </Card>    
)
})