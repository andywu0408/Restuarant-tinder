import React from 'react';
import { Button } from 'antd';
import homePageBackground from './assets/homePageBackground.jpg';

//NOTE: This is the home screen
function App() {
  return (
    <main
      style={Styles.mainContainer}
    >
      <h1 style={Styles.title}>
        Welcome to Restaurant Tinder!
      </h1>
      <Button
        type="primary"
        block
        style={Styles.startButton}
      >
        Start New Game!
    </Button>
    </main>
  );
}

const Styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    height: '100vh',
    backgroundImage: `url(${homePageBackground})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  startButton: {
    height: 120,
    fontSize: 40,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 5,
  },
  title: {
    fontSize: 80,
    color: 'white',
    marginBottom: 200,
  }
}

export default App;
