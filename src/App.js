import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import HomePage from './components/pages/HomePage';
import Conference from './components/pages/Conference';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          
          <Switch>
            <Route exact path='/' component = { HomePage } />
            <Route exact path='/Conference' component = { Conference } />
          </Switch>

          <Footer />
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
