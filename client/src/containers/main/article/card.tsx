import React, {memo} from 'react'
import UserAvatar from '../../../components/user-avatar'
import Moment from 'react-moment'
import ContentEditable from 'react-contenteditable'
import VotesForm from '../votes'

import {Article, isArticle, Votes, Reviews} from '../../../types'
import Review from '../review'

interface ac_CmpProps {
  id: string
  user: {
    id: string
    login: string
    avatar: string
  }
  title: string
  description: string
  body: string
  isEdited: boolean
  created: string
  votes: Votes
  reviews: Reviews
}

export default memo(({id, user, title, description, body, isEdited, created, reviews, votes}:ac_CmpProps) => (
  <div>
  <div className="article-card">
    <header>
      <p className="title">{title}</p>
    </header>
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
      </div>   
      <p className="description">{description}</p>
      <div className="main">
        <ContentEditable               
        html={body} 
        disabled={true}  
        tagName='article' 
        />
      </div>
    </article>
    <footer>    
      <VotesForm id={id} type="Article" />
    </footer>
  </div>
  <Review articleID={id}  />
  </div>
))
