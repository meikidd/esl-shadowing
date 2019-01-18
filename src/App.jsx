import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Subtitle from './Subtitle';
import Shadowing from './Shadowing';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/subtitle/:id" component={Subtitle} />
          <Route path="/audio/:id" component={Shadowing} />
        </Switch>
      </Router>
    );
  }
}

export default App;
