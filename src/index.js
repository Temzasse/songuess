import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAfOrgWpgdF3Ty60ZBTzGwbXssujcOEV4M',
  authDomain: 'songuess-fa039.firebaseapp.com',
  databaseURL: 'https://songuess-fa039.firebaseio.com',
  projectId: 'songuess-fa039',
  storageBucket: '',
  messagingSenderId: '381676740379'
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
