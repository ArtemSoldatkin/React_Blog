import React, {memo} from 'react'
import {Card} from 'react-bootstrap'
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import {Article} from '../../../types'
import UserAvatar from '../../../components/user-avatar'

interface CmpProps {
    article: Article
}

export default memo(({article}: CmpProps) => {
    const likes = article && article.vote ? article.vote.filter(vote => vote.value) : []
    const dislikes = article && article.vote ? article.vote.filter(vote => !vote.value) : []    
    const likesCount = likes.length > 1000 ? '999+' : `${likes.length}`
    const dislikesCount = dislikes.length > 1000 ? '999+' : `${likes.length}`   
    return (    
        <Card className="articles-article">
            <Card.Header className="articles-article__header" style={{padding: "5px"}}>
                <div className="user">
                    <Link to={`/user/${article.user.id}`}>
                        <UserAvatar user={article.user} />
                        <p className="user__login">{article.user.login}</p>   
                    </Link>            
                </div>
                <div className="title">
                    <Link to={`/article/${article.id}`}>
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
                    <p className="info__text text-like">{likesCount}</p>
                    <FontAwesomeIcon icon={faThumbsDown} className="info__thumbs thumbs-dislike"/>
                    <p className="info__text text-dislike">{dislikesCount}</p>
                </div>
                <div className="date">
                    <p className="date__text">{article.isEdited ? "Отредактирована:" : "Создана:"}</p>
                    <Moment format="DD.MM.YYYY HH:mm" date={Number(article.created)} />
                </div>
            </Card.Footer>
        </Card>    
    )
})
