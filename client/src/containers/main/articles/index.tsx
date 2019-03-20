import React, {memo} from 'react'
import { Query,Subscription } from 'react-apollo';
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {GET_ARTICLES} from '../../../queries/article'
import {Articles, User} from '../../../types'
import Loading from '../../../components/loading'
import Info from '../../../components/info'
import Article from './article'
import './style.scss'
import gql from 'graphql-tag'

type PathParamsType = {
  id: string;
};
type CmpProps = RouteComponentProps<PathParamsType> & {
  user?: User
};

export default withRouter(memo((props: CmpProps) => (
  <Query query={GET_ARTICLES} variables={{user: props.user && props.user.id ? props.user.id : props.match.params.id}} fetchPolicy="network-only">
    {({ data, loading, error, client }) => {     
      let articles: Articles = []
      if(!loading && data && data.getArticles && data.getArticles.articles) {
        articles = data.getArticles.articles        
        client.writeData({data: {articles}})         
      }      
      return (        
        <div >      
          <Loading loading={loading}>
            <div id="articles">
              {articles.map((article, index) => <Article key={`${Date.now()}/${article.id}/${index}`} id={article.id} />)}
            </div>            
          </Loading>   
          {data && data.getArticles && !data.getArticles.status           
          ? 
            (<Info type="error" message={data.getArticles.message}/>) 
          : 
            (error && <Info type="error" />)}
        </div>
      )
    }}
  </Query>
)))
