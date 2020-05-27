import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal } from 'antd';
import homePageBackground from '../assets/homePageBackground.jpg';
import SearchControl from '../SearchControl';

const locOptions = [
  {
    value: 'fremont,ca,us',
  },
  {
    value: 'davis,ca,us',
  },
  {
    value: 'SF',
  },
];

const keywordOptions = [
  {
    value: 'yummy',
  },
  {
    value: 'night',
  },
  {
    value: 'expensive',
  },
];


//NOTE: This is the home screen
const HomePage = props => {
  const history = useHistory();

  const goToGameRoom = () => {
    history.push({
      pathname: `/gameroom/${props.roomID}`,
      state: { loc: 'fremont,ca,us', limit: 50 } //TODO: Add keyword query param here too
    });
  };


  const handleClick = () => {
    Modal.info({
      title: 'Visit the link to start playing! You can also share the link with your friends so they can join!',
      content: (
        //TODO: the link in modal is hardcoded. Change it.
        //FIXME: User beside host can't enter room. Ask TA
        <a href="https://www.google.com/">{`/gameroom/${props.roomID}`}</a>
      ),
      onOk() { goToGameRoom() },
      keyboard: true,
      width: '50%',
      centered: true
    });
  };

  return (
    <main
      style={Styles.mainContainer}
    >
      <h1 style={Styles.title}>
        Welcome to Restaurant Tinder!
      </h1>
      <div style={Styles.searchControlContainer}>
        <SearchControl type="restaurants" />
        <SearchControl type="food" />
      </div>
      <Button
        type="primary"
        block
        ghost
        style={Styles.startButton}
        onClick={handleClick}
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
  searchControlContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  startButton: {
    height: 120,
    fontSize: 40,
    borderColor: 'white',
    borderWidth: 5,
  },
  title: {
    fontSize: 80,
    color: 'white',
    marginBottom: 200,
  },
  modal: {
    backgroundColor: 'pink'
  }
}

export default HomePage;
