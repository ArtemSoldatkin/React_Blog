import React, {memo} from 'react'
import {GET_ARTICLE} from '../../../queries/article'
import Loading from '../../../components/loading'
import Info from '../../../components/info'
import {Article, isArticle} from '../../../types'
import {Query} from 'react-apollo'
import ArticleCard from './card'

interface anic_CmpProps {
  id: string
}
export default memo(({id}: anic_CmpProps) => (
  <Query query={GET_ARTICLE} variables={{id}} >
    {({ data, loading, error, client }) => {
      if(loading) return <Loading loading={loading}><div id="article"></div></Loading>
      if(error) return <Info type="error" />
      if(data && data.getArticle && !data.getArticle.status) return <Info type="error" message={data.getArticle.message}/>          
      const article: Article | undefined = data && data.getArticle /*&& isArticle(data.getArticle.article)*/ && data.getArticle.article
      if(!article) return <Info type="error" message="Статья не найдена!" />       
      return (
        <ArticleCard 
              id={article.id}
              user={article.user}
              title={article.title}
              description={article.description}
              body={article.description}
              isEdited={article.isEdited}
              created={article.created}
              votes={article.votes}
              reviews={article.reviews}
            />
    )}}
  </Query>
))
