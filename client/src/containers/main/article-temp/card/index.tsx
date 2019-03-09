import React, {PureComponent} from 'react'

import {Article} from '../../articles/index'



import Header from './header'
import Body from './body'
import Footer from './footer'

interface CmpProps {
    isEditing: boolean
    article: Article
}
interface CmpStates {
    title: string
    description: string
    html: string
}

const maxTitleLength = 100;
const maxDescriptionLength = 255;


export default class Card extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps){
        super(props)
        this.state={ title: "title", description: "description", html: "<b>Hello <i>World</i></b>"}
    }
    private handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        let title: string = e.target.value
        if(title.length > maxTitleLength) title = title.substr(0, maxTitleLength)
        this.setState({title})
    }
    private handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        let description: string = e.target.value
        if(description.length > maxDescriptionLength) description = description.substr(0, maxDescriptionLength)
        this.setState({description})
    }
    contentEditable: React.RefObject<HTMLElement> = React.createRef();   
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({html: e.target.value});
      };
    render(){
        const {isEditing} = this.props
        const {title, description, body, vote, user, created, isEdited} = this.props.article
        return (
            <div className="article-card">
                <Header isEditing={isEditing} title={title} maxTitleLength={maxTitleLength} handleTitle={this.handleTitle} />
                <Body isEditing={isEditing} user={user} isEdited={isEdited} created={created} description={description} 
                handleDescription={this.handleDescription} maxDescriptionLength={maxDescriptionLength} contentEditable={this.contentEditable} 
                body={body} handleChange={this.handleChange}
                />
                <Footer vote={vote}/>                
            </div>
        )
    }
}