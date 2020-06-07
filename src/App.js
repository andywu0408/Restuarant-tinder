import React, { useState, useEffect } from 'react';
// import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import GameRoom from './components/gameroom/GameRoom';
import ErrorPage from './components/ErrorPage';

//NOTE: This is the home screen
const App = props => {

  return (
    <main>
      <HomePage roomID={props.roomID} />
    </main>
  );
}

export default App;
