import React from 'react';
import './App.css';
import { Resume } from './containers/Resume/Resume';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Landing } from './containers/Landing/Landing';
import { Error } from './containers/Error/Error';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/error" render={props => <Error {...props} />}>
        </Route>
        <Route path="/view/:userId" render={props => <Resume mode={'VIEW'} {...props} />}>
        </Route>
        <Route path="/creator" render={props => <Resume mode={'EDIT'} {...props} />}>
        </Route>
        <Route path="/" render={props => <Landing {...props} />}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
