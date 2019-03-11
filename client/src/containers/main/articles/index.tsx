import React, {memo} from 'react'
import { Query } from 'react-apollo';
import {GET_ARTICLES} from '../../../queries/article'
import {Articles, User} from '../../../types'
import Article from './article'
import './style.scss'

import {withRouter,RouteComponentProps} from 'react-router-dom'

type PathParamsType = {
  id: string;
};
type CmpProps = RouteComponentProps<PathParamsType> & {
  user?: User
};

export default withRouter(memo((props: CmpProps) => (
  <Query query={GET_ARTICLES} variables={{user: props.user && props.user.id ? props.user.id : props.match.params.id}}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR</p>;  
      const articles: Articles = data && data.getArticles && data.getArticles.articles ? data.getArticles.articles : []      
      return (
        <div className="articles">         
          {articles.map((article, index) => <Article key={`${Date.now()}/${article.id}/${index}`} article={article} />)}
        </div>
      )
    }}
  </Query>
)))
