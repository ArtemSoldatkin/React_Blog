import React from 'react';
import './app.scss';

import Header from './containers/header';
import Main from './containers/main';
import Footer from './containers/footer';

export default () => (
    <div className="app">
        <Header />
        <Main />
        <Footer />
    </div>
);
