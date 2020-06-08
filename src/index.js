import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorPage from './components/ErrorPage';
import GameRoom from './components/gameroom/GameRoom';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

const generateRoomID = length => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
let roomID = generateRoomID(12);

if (window.location.pathname == '/') {
  console.log(1)
  ReactDOM.render(

    <App roomID={roomID} />,

    document.getElementById('root')
  );
} else if (window.location.pathname.slice(0, 10) == `/gameroom/`) {
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





