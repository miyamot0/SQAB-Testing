import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import BehavioralProcesses from './components/pages/BehavioralProcesses';
import HomePage from './components/pages/HomePage';
import Conference from './components/pages/Conference';
import ExecutiveBoard from './components/pages/ExecutiveBoard';
import Programs from './components/pages/Programs';
import Registration from './components/pages/Registration';
import Resources from './components/pages/Resources';
import Submissions from './components/pages/Submissions';
import Tutorials from './components/pages/Tutorials';

import DemandCurveAnalyzer from './components/pages/DemandCurveAnalyzer';
import DiscountingModelSelector from './components/pages/DiscountingModelSelector';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Switch>
            <Route exact path='/' component={ HomePage } />
            <Route exact path='/Programs' component={ Programs } />
            <Route path='/BehavioralProcesses' component={ BehavioralProcesses } />
            <Route path='/Conference' component={ Conference } />
            <Route path='/ExecutiveBoard' component={ ExecutiveBoard } />
            <Route path='/Registration' component={ Registration } />
            <Route path='/Resources' component={ Resources } />
            <Route path='/Submissions' component={ Submissions } />
            <Route path='/Tutorials' component={ Tutorials } />

            {/* These are interactive analysis tools */ }
            <Route path='/DemandCurveAnalyzer' component={ DemandCurveAnalyzer } />
            <Route path='/DiscountingModelSelector' component={ DiscountingModelSelector } />

          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
