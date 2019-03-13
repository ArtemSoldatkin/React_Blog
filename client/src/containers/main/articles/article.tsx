import React, {memo} from 'react'
import {Card} from 'react-bootstrap'
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import {Article} from '../../../types'
import UserAvatar from '../../../components/user-avatar'
import Votes from '../votes'
interface CmpProps {
    article: Article
}

export default memo(({article}: CmpProps) => { 
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
                    <Votes votes={article.votes} disabled actionType="article"/>
                </div>
                <div className="date">
                    <p className="date__text">{article.isEdited ? "Отредактирована:" : "Создана:"}</p>
                    <Moment format="DD.MM.YYYY HH:mm" date={Number(article.created)} />
                </div>
            </Card.Footer>
        </Card>    
    )
})
