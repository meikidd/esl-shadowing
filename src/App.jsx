import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Subtitle from './Subtitle';
import Shadowing from './Shadowing';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/esl-shadowing/" component={Home} />
          <Route
            exact
            path="/esl-shadowing/subtitle/:id"
            component={Subtitle}
          />
          <Route path="/esl-shadowing/audio/:id" component={Shadowing} />
        </Switch>
      </Router>
    );
  }
}

export default App;
