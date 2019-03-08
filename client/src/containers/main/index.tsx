import React,{memo} from 'react'
import { Switch, Route } from 'react-router-dom'
import './style.scss'

import Articles from './articles'
//import Article from './article'
import Article from './article-temp'
import Cabinet from './cabinet'

export default () => (
    <div className="main">
        <Switch>
            <Route exact path="/" component={Articles}/>
            <Route path="/cabinet" component={Cabinet}/>
            <Route path="/article/:id" component={Article}/>
            <Route path="/user/:id" component={Articles}/>
        </Switch>
    </div>
)
