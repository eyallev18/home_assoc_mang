import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import Parse from 'parse'
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
    'HSnCD0iQZOWlFq55YJw9zeI3hkrd9QDK3jImQlKY', // This is your Application ID
    '4bGuPBpfk0sklFk9Dy2HzOqzy2xq0rahKa6s1Ox3' // This is your Javascript key
);
ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
