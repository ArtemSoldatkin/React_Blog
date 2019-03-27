import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

//Apollo
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';





//---
import gql from 'graphql-tag'

const fragment = gql`
    fragment reviews on Articles {
        reviews @client {id}
    }
`
import {Reviews} from './types'
interface _t {
  reviews: Reviews
}
//---

const cache = new InMemoryCache( );
const client = new ApolloClient({
  cache,  
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql',    
    headers: {
      authorization: localStorage.getItem('token')    
    },    
  }), 
 
  resolvers: {
    Mutation: {
      addOrRemoveReview: (_, {id}, { cache:_cache }) => {  
        
        const {reviews}:_t = _cache.readFragment({fragment, id: `Article:${id}`})
        console.log('_', reviews)
        const data = {
          reviews: reviews.includes(id)
            ? reviews.filter(review => review.id !== id)
            : [...reviews, id],
        };
        _cache.writeFragment({fragment, id: `Article:${id}`, data})
        return data.reviews
        //return reviews
      },
    }    
  }
});

const getUserInStore = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

cache.writeData({
  data: {     
    user: getUserInStore(),    
    articles: []   
  }
});
  




ReactDOM.render(
  <ApolloProvider client={client}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
</ApolloProvider>
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister(); 
