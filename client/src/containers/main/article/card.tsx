import React, {memo, useState, useEffect} from 'react'
import ContentEditable from 'react-contenteditable'
import {Link} from 'react-router-dom'
import {Article, InputData} from '../../../types'
import {maxTitleLength, maxDescriptionLength} from '../../../constants'
import CustomTextArea from '../../../components/textarea'
import CreatedDate from '../../../components/created-date'
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
    <div className="article">
      <header className="article__h">
        {isEditing ? 
          <div className="article__t">
            <CustomTextArea maxLength={maxTitleLength} onChange={title => setData({...data, title})} initialState={article.title}/>
          </div>
        : 
          <div className="article__t">{article.title}</div>
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
      <article className="article__b">
        <div className="article__info">
        <Link to={`/user/${article.user.id}`}>
          <div className="user_date">          
            <UserAvatar user={article.user} />  
            <div className="user_date__tx">
              <p className="user_date__login">{article.user.login}</p>
              <CreatedDate created={article.created} isEdited={article.isEdited} />
            </div>            
          </div>  
          </Link> 
        </div>   
        {isEditing ? 
          <div className="article__descr">
            <CustomTextArea maxLength={maxDescriptionLength} onChange={description => setData({...data, description})} initialState={article.description} />
          </div>
        : 
          <div className="article__descr">{article.description}</div>
        } 
        <div className="article__main">
          <ContentEditable               
          html={isEditing ? (data.body ? data.body : article.body ): article.body} 
          disabled={!isEditing}  
          tagName='article' 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, body: e.target.value})}          
          />
        </div>
      </article>
      <footer className="article__f">    
        <VotesForm id={article.id} type="Article" votes={article.votes}/>
      </footer>
    </div>
    <Review articleID={article.id} reviews={article.reviews} />
  </>
)})
