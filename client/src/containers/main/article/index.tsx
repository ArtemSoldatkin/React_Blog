import React, {memo} from 'react'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {GET_ARTICLE, GetArticle} from '../../../queries/article'
import ArticleCard from './card'
import './style.scss'

type PathParamsType = {id: string }
interface CmpProps extends RouteComponentProps<PathParamsType> {}

export default withRouter(memo((props: CmpProps) => (
  <GetArticle query={GET_ARTICLE} variables={{id: props.match.params.id}} fetchPolicy="cache-and-network">
    {({data, loading, error}) => {
      if(!loading && !error && data && data.getArticle && data.getArticle.article) {
        const {article} = data.getArticle
        return <ArticleCard article={article}/>
      }
      return <></>
    }}
  </GetArticle>
)))
