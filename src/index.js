import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
require('heroku-self-ping')("https://imaginary-air.herokuapp.com/");

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
