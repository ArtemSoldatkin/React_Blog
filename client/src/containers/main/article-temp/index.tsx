import React, {PureComponent} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUndo, faSave } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import { render } from 'react-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
//--
import Actions from './actions'
import Card from './card'
import {Link, withRouter,RouteComponentProps} from 'react-router-dom'

import {Article} from '../articles/index'
type PathParamsType = {
    id: string;
  };
  type CmpProps = RouteComponentProps<PathParamsType> & {
   
  };
interface CmpStates {
    isEditing: boolean
}



const GET_ARTICLE = gql`
  query GetArticle($id: String!) {    
    getArticle(id:$id) {        
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


export default withRouter(class cArticle extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        this.state={ isEditing: false }
    }
    private setEdited = (isEditing: boolean): void => this.setState({isEditing})
    render() {
    const {isEditing} = this.state
    return (
        <Query query={GET_ARTICLE} variables={{id: this.props.match.params.id}}>
            {({ data, loading, error }) => {               
                if (loading) return <p>Loading...</p>;
                if (error) return <p>ERROR</p>;
                const article: Article = data && data.getArticle && data.getArticle.articles
                console.log('article', article)
                if(!article) return <p>Not Found</p>
                return (
                  <div className="article">
                    <Actions userID={article.user.id}isEditing={isEditing} setEdited={this.setEdited}/>
                    <Card isEditing={isEditing} article={article}/>  
                  </div>
                )                
            }}
        </Query>       
       
)}})


/*
 <div className="article">
           add in actions
            <Query query={IS_LOGGED_IN}>
                {({ data }) => {            
                const user = data && data.user && JSON.parse(data.user) 
                console.log('user', user)
                return (<Actions isEditing={isEditing} setEdited={this.setEdited}/>)
                }}
            </Query>


            <Card isEditing={isEditing}/>
           Review
            </div>
*/ 