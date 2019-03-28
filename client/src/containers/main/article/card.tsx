import React, {memo, useState, useEffect} from 'react'
import Moment from 'react-moment'
import ContentEditable from 'react-contenteditable'
import {Link} from 'react-router-dom'
import {Article, InputData} from '../../../types'
import {maxTitleLength, maxDescriptionLength} from '../../../constants'
import CustomTextArea from '../../../components/text-area'
import UserAvatar from '../../../components/user-avatar'
import ArticleActions from '../actions'
import Review from '../review'
import VotesForm from '../votes'

interface CmpProps {
  article: Article
}

export default memo(({article}:CmpProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [data, setData] = useState<InputData>({})
  useEffect(() => {
    if(isEditing) setData({title: article.title, description: article.description, body: article.body})    
  },[isEditing]) 
return (
  <>
    <div className="article-card">
      <header>
        {isEditing ? 
          <div className="title">
            <CustomTextArea maxLength={maxTitleLength} onChange={title => setData({...data, title})} initialState={article.title}/>
          </div>
        : 
          <p className="title">{article.title}</p>
        } 
        <ArticleActions 
        id={article.id} 
        type="Article" 
        userID={article.user.id}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        inputData={data}
        />
      </header>
      <article>
        <div className="info">
        <Link to={`/user/${article.user.id}`}>
          <div className="user-info">
          
            <UserAvatar user={article.user} />  
            <div className="login-date">
              <p className="login">{article.user.login}</p>
              <div className="date">
                <p className="date__text">{article.isEdited ? "Отредактирована:" : "Создана:"}</p>
                <Moment format="DD.MM.YYYY HH:mm" date={Number(article.created)} />
              </div>
            </div>
            
          </div>  
          </Link> 
        </div>   
        {isEditing ? 
          <div className="description">
            <CustomTextArea maxLength={maxDescriptionLength} onChange={description => setData({...data, description})} initialState={article.description} />
          </div>
        : 
          <p className="description">{article.description}</p>
        } 
        <div className="main">
          <ContentEditable               
          html={isEditing ? (data.body ? data.body : article.body ): article.body} 
          disabled={!isEditing}  
          tagName='article' 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, body: e.target.value})}          
          />
        </div>
      </article>
      <footer>    
        <VotesForm id={article.id} type="Article" votes={article.votes}/>
      </footer>
    </div>
    <Review articleID={article.id} reviews={article.reviews} />
  </>
)})
