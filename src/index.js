import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorPage from './components/ErrorPage';
import GameRoom from './components/gameroom/GameRoom';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';

console.log("HI")
if (window.location.pathname == '/') {
  console.log(1)
  ReactDOM.render(

    <App />,

    document.getElementById('root')
  );
} else if (window.location.pathname == `/gameroom`) {
  console.log(2)
  ReactDOM.render(

    <GameRoom />,

    document.getElementById('root')
  );
} else {
  ReactDOM.render(

    <ErrorPage />,

    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();





