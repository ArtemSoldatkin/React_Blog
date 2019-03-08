import React, {memo} from 'react'
import {Image, Button} from 'react-bootstrap'
import {Link, withRouter,RouteComponentProps} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import {Article} from '../articles/index'
import './style.scss'
import { Query } from 'react-apollo';

import Review from '../review'

import gql from 'graphql-tag';
const GET_ARTICLE = gql`
  query GetArticle($id: String!) {    
    getArticle(id:$id) {        
      status
            message
            articles { 
            id, 
            user {id, login, avatar}
            title,
            description, 
            created, 
            isEdited, 
            vote { userID, value } 
            }
    }
  }
`;

type PathParamsType = {
  id: string;
};
type CmpProps = RouteComponentProps<PathParamsType> & {
 
};

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client  
    user @client 
  }
`;

export default withRouter(memo((props:CmpProps) => {
  
  return (   
    
    <Query query={GET_ARTICLE} variables={{id: props.match.params.id}}>
    {({ data, loading, error }) => {
      console.log('error', error)
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR</p>;
      const article: Article = data.getArticle.articles
      const likes = article.vote ? article.vote.filter(vote => vote.value) : []
    const dislikes = article.vote ? article.vote.filter(vote => !vote.value) : []    
    const likesCount = likes.length > 1000 ? '999+' : `${likes.length}`
    const dislikesCount = dislikes.length > 1000 ? '999+' : `${likes.length}`
      return (
        <div>
          <Query query={IS_LOGGED_IN}>
          {({ data }) =>{ 
            console.log(data)
            const user = data && JSON.parse(data.user) 
            //if(data && data.user)console.log('data', data.user && JSON.parse(data.user))
            return(
            data && data.isLoggedIn && user && article.user.login === user.login &&
            <div className="article__actions">
              <Button>Изменить</Button>
              <Button>Удалить</Button>
            </div>
            )}}
        </Query> 
        <div className="article"> 
           
          <div className="article__header">
            <div className="user">
              <Link to={`/user/${article.user.id}`}>
                <Image className="user__avatar" src={String(article.user.avatar)} rounded  />
                <p className="user__login">{article.user.login}</p>   
              </Link>            
            </div>   
            <div className="title">
              <h1>{article.title}</h1>
            </div>
          </div>
          <div className="article__body">
            <div className="description">              
                <div className="description__text">{article.description}</div>
              
            </div>
          </div>
          <div className="article__footer">
            <div className="info">
              <span className="button">
                <FontAwesomeIcon icon={faThumbsUp} className="button__thumbs thumbs-like"/>
                <p className="button__text text-like">{likesCount}</p>
              </span>
              <span className="button">
                <FontAwesomeIcon icon={faThumbsDown} className="button__thumbs thumbs-dislike"/>
                <p className="button__text text-dislike">{dislikesCount}</p>
              </span>
            </div>
            <div className="date">
              <p className="date__text">{article.isEdited ? "Отредактирована:" : "Создана:"}</p>
              <Moment format="DD.MM.YYYY HH:mm" date={Number(article.created)} />
            </div>
          </div>    
        </div>
        <Review />
        </div>
      );
    }}
  </Query>


    )}
))
  


/*
import {Button} from 'react-bootstrap'
import Moment from 'react-moment';

const article = {
    id: "1",
    user: {id: "1", login: "user", avatar: ""},
    title: "title",
    description: "description",
    vote: [{userID: "2", value: true}],
    created: new Date(),
    isEdited: false 
}


export default memo(() => {
    const likes = article.vote.filter(vote => vote.value)
    const dislikes = article.vote.filter(vote => !vote.value)
    return (
    <div className="article">
        <div className="article__actions">
            
        </div>
        <div className="article__user">
            <p>User: {article.user.login}</p>
        </div>
        <div className="article__title">
            <h1>{article.title}</h1>
        </div>
        <div className="article__description">
            {article.description}
        </div>
        <div className="article__info">
            <div>
                <p>Likes: {likes.length}</p>
                <p>Dislikes: {dislikes.length}</p>
            </div>
            <div>
                <p>{article.isEdited ? "Отредактирована:" : "Создана:"}</p>
                <Moment format="DD.MM.YYYY HH:mm" date={article.created} />
            </div>
        </div>
    </div>
)})*/