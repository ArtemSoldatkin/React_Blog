import React, {memo} from 'react'
import { Query } from 'react-apollo';
import './style.scss'

import ArticleA from './article'

import gql from 'graphql-tag';
const GET_ARTICLES = gql`
    query getArticles {
        getArticles(user: null, search: null){
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

export interface Article {
    id: string,
    user: {id: string, login: string, avatar: string}
    title: string
    description: string
    vote: [{userID: string, value: boolean}]
    body: string
    created: string
    isEdited: boolean
}

type Articles = Article[]

interface a {
    data: Articles
}

export default memo(() => (
    <Query query={GET_ARTICLES}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR</p>;    
      const a = data.getArticles.articles as Articles
      console.log('f', data.getArticles)
      return (
        <div className="articles">         
          {a.map((article, index) => <ArticleA key={`${Date.now()}/${article.id}/${index}`} article={article} />) }
        </div>
      )
    }}
  </Query>
))

/*
//add in href user id!!


export interface Article {
    id: String,
    user: {id: String, login: String, avatar: String}
    title: String
    description: String
    vote: [{userID: String, value: Boolean}]
    created: Date
    isEdited: Boolean
}

type Articles = Article[]

const mockArticlesConstructor = ( ): Articles => {
    let articles:Articles = []
    for(let i = 0; i < 10; i++){
        articles.push({
            id: String(i),
            user: {id: String(i), login: String(i), avatar: String(i)},
            title: String(i),
            description: String(i),
            vote: [{userID: String(i), value: i % 2 === 0 ? true : false}],
            created: new Date(),
            isEdited: i % 2 === 0 ? true : false
        })
    }
    return articles
}

export default memo(() => {
    const mockArticles = mockArticlesConstructor()
    const articles = mockArticles.map((article, index) => <Article key={`${Date.now()}/${article.id}/${index}`} article={article} /> )
    return (
        <div className="articles">
            {articles}     
        </div>
    )
})
*/