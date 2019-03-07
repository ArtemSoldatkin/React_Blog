import React, { Component } from 'react';
import './app.scss';

import Header from './containers/header'
import Main from './containers/main'
import Footer from './containers/footer'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
