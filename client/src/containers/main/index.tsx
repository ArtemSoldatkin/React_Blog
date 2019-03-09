import React,{memo} from 'react'
import { Switch, Route } from 'react-router-dom'
import './style.scss'

import Articles from './articles'
//import Article from './article'
import Article from './article-temp'
import Cabinet from './cabinet'
import NewArticle from './cabinet/new-article'
import UserInfo from './cabinet/info'

export default () => (
    <div className="main">
        <Switch>
            <Route exact path="/" component={Articles}/>
            <Route exact path="/cabinet" component={Cabinet}/>
            <Route path="/cabinet/info" component={UserInfo}/>
            <Route path="/cabinet/new-article" component={NewArticle}/>
            <Route path="/article/:id" component={Article}/>
            <Route path="/user/:id" component={Articles}/>
        </Switch>
    </div>
)
