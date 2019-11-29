import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase/app";
import "firebase/auth";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth } from './services/Auth';
import { firebaseConfig } from './secrets';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Auth.subcribeAuthStateChange();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
