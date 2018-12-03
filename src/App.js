import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import HomePage from './components/pages/HomePage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          
          <Switch>
            <Route exact path='/' component={ HomePage } />
          </Switch>

          <Footer />
        </div> 
      </BrowserRouter>
    );
  }
}

//<Switch>
//<Route exact path='/' component={Dashboard} />
//</Switch>
//<Route path='/signin' component={SignIn} />
//<Route path='/project/:id' component={ProjectDetails} />
//<Route path='/VisualDiscrimination' component={VisualDiscrimination} />


export default App;
