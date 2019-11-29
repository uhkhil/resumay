import React from 'react';
import './App.css';
import { ResumeCreator } from './containers/ResumeCreator/ResumeCreator';
import { ResumeViewer } from './containers/ResumeViewer/ResumeViewer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Creator</Link>
          </li>
          <li>
            <Link to="/view">View</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/view">
            <ResumeCreator mode={'VIEW'} />
          </Route>
          <Route path="/" >
            <ResumeCreator mode={'EDIT'} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
