import React, {memo} from 'react'
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import {Article} from '../../../types'
import UserAvatar from '../../../components/user-avatar'
import VotesForm from '../votes'

interface CmpProps {
    article: Article
}

export default memo(({article}: CmpProps) => (
    <div className="article">
                    <header>
                        <div className="user">
                            <Link to={`/user/${article.user.id}`}>
                                <UserAvatar user={article.user} />
                                <p className="login">{article.user.login}</p>   
                            </Link>            
                        </div>
                        <div className="title">
                            <Link to={`/article/${article.id}`}>
                                <div className="text">{article.title}</div>
                            </Link>
                        </div>
                    </header>
                    <article>
                        <Link to={`/article/${article.id}`}>
                                <div className="text">{article.description}</div>
                        </Link>         
                    </article> 
                    <footer>
                        <div className="info">
                            <VotesForm id={article.id} type="Article" />
                        </div>
                        <div className="date">
                            <p className="text">{article.isEdited ? "Отредактирована:" : "Создана:"}</p>
                            <Moment format="DD.MM.YYYY HH:mm" date={Number(article.created)} />
                        </div>
                    </footer>
    </div> 
    
))
