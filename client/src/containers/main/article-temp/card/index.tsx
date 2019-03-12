import React, {PureComponent} from 'react'
import {Article, NewArticle} from '../../../../types'
import {maxTitleLength, maxDescriptionLength} from '../../../../constants'
import Header from './header'
import Body from './body'
import Footer from './footer'

interface CmpProps {
    isEditing: boolean
    article: Article
    onChange?: (article: NewArticle) => void
}
interface CmpStates {
    title: string
    description: string
    body: string
}

export default class Card extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps){
        super(props)
        this.state = { 
            title: this.props.article.title, 
            description: this.props.article.description, 
            body: this.props.article.description
        }
    }
    private handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        let title: string = e.target.value
        if(title.length > maxTitleLength) title = title.substr(0, maxTitleLength)
        this.setState({title}, () => {
            const {title, description, body} = this.state
            this.props.onChange && this.props.onChange({title, description, body})
        })
    }
    private handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        let description: string = e.target.value        
        if(description.length > maxDescriptionLength) description = description.substr(0, maxDescriptionLength)
        this.setState({description}, () => {
            const {title, description, body} = this.state
            this.props.onChange && this.props.onChange({title, description, body})
        })
    }   
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({body: e.target.value}, () => {
            const {title, description, body} = this.state
            this.props.onChange && this.props.onChange({title, description, body})
        })
    };
    render(){
        const {isEditing} = this.props
        const {vote, user, created, isEdited} = this.props.article
        const {title, description, body} = this.state
        return (
            <div className="article-card">
                <Header isEditing={isEditing} title={title} maxTitleLength={maxTitleLength} handleTitle={this.handleTitle} />
                <Body isEditing={isEditing} user={user} isEdited={isEdited} created={created} description={description} 
                handleDescription={this.handleDescription} maxDescriptionLength={maxDescriptionLength}
                body={body} handleChange={this.handleChange}
                />
                <Footer vote={vote}/>                
            </div>
        )
    }
}