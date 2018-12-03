import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import HomePage from './components/pages/HomePage';
import Conference from './components/pages/Conference';
import Programs from './components/pages/Programs';
import Registration from './components/pages/Registration';
import Submissions from './components/pages/Submissions';
import Tutorials from './components/pages/Tutorials';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          
          <Switch>
            <Route exact path='/' component = { HomePage } />
            <Route exact path='/Programs' component = { Programs } />            
            <Route path='/Conference' component = { Conference } />
            <Route path='/Registration' component = { Registration } />
            <Route path='/Submissions' component = { Submissions } />
            <Route path='/Tutorials' component = { Tutorials } />
          </Switch>

          <Footer />
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
