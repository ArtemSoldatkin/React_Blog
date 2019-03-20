import React, {memo} from 'react'
import {ApolloConsumer} from 'react-apollo'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import ArticleCard from './card'
import ArticleFetch from './fetch'
import './style.scss'

type PathParamsType = {id: string }
interface CmpProps extends RouteComponentProps<PathParamsType> {}

//-- temp
import gql from 'graphql-tag'
const fragment = gql`
    fragment article on Articles {
        id
        user {id login avatar}
        title
        description
        isEdited
        created
        votes {userID value}
        reviews {
          id
          user {id login avatar}
          body 
          isEdited
          created
          votes {userID value}
        }
    }
`
//-- /temp

export default withRouter(memo((props: CmpProps) => (
  <ApolloConsumer>
    {client => {
      const id = `Article:${props.match.params.id}`            
      const article = client.readFragment({fragment, id})    
      if(!article) return <ArticleFetch id={props.match.params.id} /> 
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
      )   
    }}
  </ApolloConsumer>
)))
