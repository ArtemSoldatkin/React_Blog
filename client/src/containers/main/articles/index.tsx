import React,{memo} from 'react'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {GetArticles, GET_ARTICLES} from '../../../queries/article'
import { User} from '../../../types'
import Article from './article'
import './style.scss'

interface PathParamsType { id: string };
interface CmpProps extends RouteComponentProps<PathParamsType>  {
  user?: User
}

export default withRouter(memo((props: CmpProps) => (
  <div id="articles">
    <GetArticles query={GET_ARTICLES} variables={{user: props.user && props.user.id ? props.user.id : props.match.params.id}}
    fetchPolicy="cache-and-network">
      {({data, loading, error}) => {
        if(!loading && data && data.getArticles && data.getArticles.articles) {
          const {articles} = data.getArticles
          return <>{articles.map((article, index) => <Article key={`${Date.now()}/${article.id}/${index}`} article={article} />)}</>
        }
        return <></>
      }}
    </GetArticles>
  </div>
)))
