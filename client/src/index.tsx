import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.scss'
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || "",
    }
  }
});
const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});
const cache = new InMemoryCache( );
const client = new ApolloClient({
  cache,  
  link: authLink.concat(httpLink),  
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
