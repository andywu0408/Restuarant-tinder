import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import GameRoom from './components/gameroom/GameRoom';
import ErrorPage from './components/ErrorPage';

//NOTE: This is the home screen
const App = () => {
  const [roomID, setRoomID] = useState(null);
  console.log("In app, room id is " + roomID)
  const generateRoomID = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useEffect(() => {
    const randomStr = generateRoomID(16);
    setRoomID(randomStr);
  }, []);

  return (
    <main>
      <Switch>
        <Route
          path='/'
          component={() => <HomePage roomID={roomID} />}
          exact
        />
        {/* <Route //FIXME
          path='/'
          component={() => <GameRoom roomID={roomID} />}
          exact
        /> */}
        <Route
          path={`/gameroom/${roomID}`}
          component={() => <GameRoom roomID={roomID} />}
        />

        <Route component={ErrorPage} />
      </Switch>
    </main>
  );
}

export default App;
