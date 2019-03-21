import React, {memo} from 'react'
import { Query,Subscription } from 'react-apollo';
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {GET_ARTICLES} from '../../../queries/article'
import {Articles, User} from '../../../types'
import Loading from '../../../components/loading'
import ErrorHandler from '../../../components/error-handler'
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
//---TEMP
interface T_GetArticles {
  getArticles: {
    status: boolean
    message: string
    articles: Articles | null
  }
}
class GetArticles extends Query<T_GetArticles>{}
//---/TEMP

export default withRouter(memo((props: CmpProps) => (
  <GetArticles query={GET_ARTICLES} variables={{user: props.user && props.user.id ? props.user.id : props.match.params.id}} fetchPolicy="network-only">
    {({ data, loading, error, client }) => {  
      if(loading) return <Loading loading={loading}><div id="articles" /></Loading>
      if(data && data.getArticles && data.getArticles.articles) {
        const articles = data.getArticles.articles
        client.writeData({data: {articles}})  
        return (
          <div id="articles">
            {articles.map((article, index) => <Article key={`${Date.now()}/${article.id}/${index}`} id={article.id} />)}
          </div>
        )        
      } 
      return <ErrorHandler error={error} data={data} name="getArticles" />
    }}
  </GetArticles>
)))
