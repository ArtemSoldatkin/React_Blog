import React, {memo} from 'react'

import { Query } from 'react-apollo';

import gql from 'graphql-tag';
const GET_ARTICLES = gql`
  query getArticles {
    getArticles(user: null, search: "hello"){
        status
        message
        articles {id title description}
    }
  }
`;


export default memo(() => (   
    
    <Query query={GET_ARTICLES}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR</p>;
      
      return (
        <div>          
          {data.getArticles &&
            data.getArticles.articles &&
            data.getArticles.articles.map(article => (
              <div>
                    <p>Title: {article.title}</p>
                    <p>DEscription: {article.description}</p>
              </div>
            ))}
        </div>
      );
    }}
  </Query>


    )
)
  


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