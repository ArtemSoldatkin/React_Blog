import React, {PureComponent} from 'react'
import {Article, NewArticle} from '../../../../types'
import {maxTitleLength, maxDescriptionLength} from '../../../../constants'
import Header from './header'
import Body from './body'
import Footer from './footer'

interface CmpProps {
   // isEditing: boolean
    article: Article
    //onChange?: (article: NewArticle) => void
}
interface CmpStates {  
    title: string | undefined
    description: string | undefined
    body: string | undefined    
    isEdited: boolean | undefined
    isEditing: boolean
}

export default class Card extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps){
        super(props)
        this.state = { 
            title: undefined, 
            description: undefined, 
            body: undefined,                
            isEdited: undefined,
            isEditing: false
        }
    }    
    private setTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let title: string = e.target.value
        if(title.length > maxTitleLength) title = title.substr(0, maxTitleLength)       
        this.setState({title})
    }
    private setDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let description: string = e.target.value
        if(description.length > maxDescriptionLength) description = description.substr(0, maxDescriptionLength)       
        this.setState({description})
    }
    private setBody = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({body: e.target.value})
    private clear = () => this.setState({
        title: undefined,
        description: undefined,
        body: undefined,
        isEdited: undefined
    })
    private setEdited = (isEdited: boolean) => this.setState({isEdited})  
    private setEditing = (isEditing: boolean) => this.setState({isEditing})
    render(){       
        const {article} = this.props
        const { isEditing, title, description, body, isEdited} = this.state
        return (
            <div className="article-card">
                <Header isEditing={isEditing} title={article.title}  
                setTitle={this.setTitle} 
                id={article.id}
                newArticle={{title, description, body}}               
                userID={article.user.id}
                clear={this.clear}
                setEditing={this.setEditing}            
                />
                <Body isEditing={isEditing} 
                user={article.user} 
                isEdited={article.isEdited} 
                created={article.created} 
                description={article.description} 
                setDescription={this.setDescription}                 
                body={article.body} 
                setBody={this.setBody}
                newArticle={{title, description, body}}
                />
                <Footer votes={article.votes}/>                
            </div>
        )
    }
}