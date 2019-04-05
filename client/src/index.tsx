import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

import introspectionQueryResultData from './fragmentTypes.json';
import App from './App';
import './index.scss';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token || '',
        },
    };
});
const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
});
const cache = new InMemoryCache({
    addTypename: true,
    fragmentMatcher,
});
const client = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
});

const getUserInStore = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

cache.writeData({
    data: {
        user: getUserInStore(),
        articles: [],
    },
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
