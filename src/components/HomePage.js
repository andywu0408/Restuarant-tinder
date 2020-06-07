import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import SearchControl from '../SearchControl';
import LocSearchBar from './LocSearchBar';
import './homepage.css';

//NOTE: This is the home screen
const HomePage = props => {

  const [selectedFoodTags, setSelectedFoodTags] = useState([]);
  const [selectedRestaurantTags, setSelectedRestaurantTags] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    console.log("In homepage")
    console.log(typeof (selectedFoodTags));
    console.log(selectedFoodTags)
  }, [selectedFoodTags]);

  useEffect(() => {
    console.log("In homepage")
    console.log(typeof (selectedRestaurantTags));
    console.log(selectedRestaurantTags)
  }, [selectedRestaurantTags]);

  useEffect(() => {
    console.log("In homepage")
    console.log(typeof (selectedLocation));
    console.log(selectedLocation)
  }, [selectedLocation]);

  const setupGame = () => {
    console.log("Sending post request to server with keywords/loc")
    // history.push({
    //   pathname: `/gameroom`,
    //   state: {
    //     loc: selectedLocation,
    //     queryParams: selectedFoodTags.toString() + "," + selectedRestaurantTags.toString(),
    //     limit: 20,
    //   }
    // });
  };


  const handleClick = () => {
    setupGame();
    Modal.info({
      title: 'Visit the link to start playing! You can also share the link with your friends so they can join!',
      content: (
        //TODO: the link in modal is hardcoded. Change it.
        //FIXME: User beside host can't enter room. Ask TA
        <a href={`${window.location.href}gameroom`}>{`${window.location.href}gameroom`}</a>
      ),
      // onOk() { goToGameRoom() },
      keyboard: true,
      width: '50%',
      centered: true,
      okText: 'cancel'
    });
  };

  return (
    <main
      id="mainContainer"
    >
      <h1 id="title">
        Welcome to Restaurant Tinder!
      </h1>
      <div id="searchControlContainer">
        <SearchControl type="restaurants" updateVal={setSelectedRestaurantTags} />
        <SearchControl type="food" updateVal={setSelectedFoodTags} />
        <LocSearchBar updateVal={setSelectedLocation} />
      </div>
      <Button
        type="primary"

        ghost
        id="startButton"
        onClick={handleClick}
      >
        Start New Game!
      </Button>
    </main>
  );
}

const Styles = {
  // mainContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 60,
  //   height: '100vh',
  //   backgroundImage: `url(${homePageBackground})`,
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  // },
  // searchControlContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  // },
  // startButton: {
  //   height: 120,
  //   fontSize: 40,
  //   borderColor: 'white',
  //   borderWidth: 5,
  // },
  // title: {
  //   fontSize: 80,
  //   color: 'white',
  //   marginBottom: 200,
  // },
  modal: {
    backgroundColor: 'pink'
  }

}

export default HomePage;
