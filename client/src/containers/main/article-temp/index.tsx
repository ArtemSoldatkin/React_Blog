import React, {memo} from 'react'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import { Query } from 'react-apollo';
import Loading from '../../../components/loading'
import Info from '../../../components/info'
import {GET_ARTICLE} from '../../../queries/article'
import {Article, isArticle} from '../../../types'
import ArticleCard from './card'
import Review from '../review'
import './style.scss'

type PathParamsType = {id: string }
interface CmpProps extends RouteComponentProps<PathParamsType> {}

export default withRouter(memo((props: CmpProps) => (  
  <Query query={GET_ARTICLE} variables={{id: props.match.params.id}} >
    {({ data, loading, error }) => {
      if(loading) return <Loading loading={loading}><div id="article"></div></Loading>
      if(error) return <Info type="error" />
      if(data && data.getArticle && !data.getArticle.status) return <Info type="error" message={data.getArticle.message}/>          
      const article: Article | undefined = data && data.getArticle && isArticle(data.getArticle.article) && data.getArticle.article
      if(!article) return <Info type="error" message="Статья не найдена!" />         
      return (
        <div id="article">
          <ArticleCard article={article} />
          <Review id={article.id} reviews={article.reviews} />
        </div>
    )}}
  </Query>   
)))
