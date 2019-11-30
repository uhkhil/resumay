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
import { MODES } from './components/constants/Mode';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/error" render={props => <Error {...props} />}>
        </Route>
        {/* TODO: Use context API to send mode props */}
        <Route path="/view/:userId" render={props => <Resume mode={MODES.VIEW} {...props} />}>
        </Route>
        <Route path="/creator" render={props => <Resume mode={MODES.EDIT} {...props} />}>
        </Route>
        <Route path="/" render={props => <Landing {...props} />}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
