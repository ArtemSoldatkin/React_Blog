import React, {PureComponent} from 'react'
import {Form, Button, Image} from 'react-bootstrap'
//---
import ContentEditable from 'react-contenteditable'
//---
import './style.scss'

interface CmpProps {}
interface CmpStates {
    html: string
}

export default class Review extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps) {
        super(props)
        
        this.state = {html: "<b>Hello <i>World</i></b>"};
    }  
    contentEditable: React.RefObject<HTMLElement> = React.createRef();   
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({html: e.target.value});
      };

    handleSubmit = () => {
        console.log(this.state.html)
    }
    render () {
        return (
            <div className="review">
                <div className="user">
                    <Image className="user__avatar" rounded src={''}/>
                </div>
                <div className="actions">
                            <ContentEditable
                        innerRef={this.contentEditable}
                        html={this.state.html} // innerHTML of the editable div
                        disabled={false}       // use true to disable editing
                        onChange={this.handleChange} // handle innerHTML change
                        tagName='article' // Use a custom HTML tag (uses a div by default)
                        />
                       


                    <div className="actions__button">
                        <Button onClick={this.handleSubmit}>Отправить</Button>
                    </div>                    
                </div>                
            </div> 

          
        )
    }
}


/*
<div className="actions__text" contentEditable 
                     onInput={(e: React.FormEvent<HTMLDivElement>) => console.log(e.currentTarget.textContent)}></div>
*/
  /*<Form onSubmit={this.handleSubmit} className="review">
                <Form.Control type="textarea" as="textarea" placeholder="Оставьте комментарий..."/>
                <Button type="submit">Отправить</Button>
        </Form> */          