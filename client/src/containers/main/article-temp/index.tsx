import React, {PureComponent} from 'react'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import { Query } from 'react-apollo';
import {GET_ARTICLE} from '../../../queries/article'
import {IS_LOGGED_IN} from '../../../queries/user'
import {User, Article, NewArticle} from '../../../types'
import Actions from './actions'
import Card from './card'
import Review from '../review'
import './style.scss'

type PathParamsType = {id: string }
interface CmpProps extends RouteComponentProps<PathParamsType> {}
interface CmpStates {
  isEditing: boolean
  article: NewArticle
}

export default withRouter(class cArticle extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state={ isEditing: false, article: {title: '', description: '', body: ''}}
    }
    private setEdited = (isEditing: boolean): void => this.setState({isEditing})
    private handleChange = (article: NewArticle): void => this.setState({article})

  render() {
    const {isEditing, article: newArticle} = this.state
    return (
      <Query query={GET_ARTICLE} variables={{id: this.props.match.params.id}} >
        {({ data, loading, error }) => {               
          if (loading) return <p>Loading...</p>;
          if (error) return <p>ERROR</p>;
          const article: Article = data && data.getArticle && data.getArticle.article              
          if(!article) return <p>Not Found</p>
            return (                  
              <Query query={IS_LOGGED_IN}>
                {({ data }) => {   
                  const user: User | undefined = data && data.user && JSON.parse(data.user)
                  return (
                    <div className="article">
                      {user && user.id === article.user.id && <Actions article={newArticle} isEditing={isEditing} setEdited={this.setEdited} id={article.id}/>}
                      <Card isEditing={isEditing} article={article} onChange={this.handleChange}/>  
                      <Review id={article.id} user={user} reviews={article.reviews} />
                    </div>
                  )
                }}
              </Query>
            )                
        }}
      </Query>   
    )
  }    
})
