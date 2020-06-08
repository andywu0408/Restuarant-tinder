import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import SearchControl from '../SearchControl';
import LocSearchBar from './LocSearchBar';
import './homepage.css';

//NOTE: This is the home screen
const HomePage = props => {
  const [Restaurants, setRestaurants] = useState([]);
  const [selectedFoodTags, setSelectedFoodTags] = useState(["all"]);
  const [selectedRestaurantTags, setSelectedRestaurantTags] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("davis,ca");

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
    getRestaurants();
    // history.push({
    //   pathname: `/gameroom`,
    //   state: {
    //     loc: selectedLocation,
    //     queryParams: selectedFoodTags.toString() + "," + selectedRestaurantTags.toString(),
    //     limit: 20,
    //   }
    // });
  };

  const getRestaurants = async () => {

    let queryParams = selectedFoodTags.toString() + "," + selectedRestaurantTags.toString();
    let lurl = `https://api.yelp.com/v3/businesses/search?categories=
                  ${queryParams}
                  &limit=16&location=${selectedLocation}`;
    console.log('lurl is ' + lurl)
    let kek = "https://cors-anywhere.herokuapp.com/"

    let url = kek + lurl;
    //GaS8MVZOoznvBJmkaZgAHxraTNOgmXnfQVffKpt-6WZZGNPSzL4MSzxFes2uD7V4Y-WqW0V_B_kLysY1TBHGShW9_n9O-vTkbSPqDabxNZPBdnFObQDAXes2UazHXnYx

    await fetch(url, {
      headers: {
        //TODO: hide API key with .env
        Authorization: 'Bearer GaS8MVZOoznvBJmkaZgAHxraTNOgmXnfQVffKpt-6WZZGNPSzL4MSzxFes2uD7V4Y-WqW0V_B_kLysY1TBHGShW9_n9O-vTkbSPqDabxNZPBdnFObQDAXes2UazHXnYx',
      }
    })
      // fetch returns a Promise the resolves into the response object
      .then(response => { return response.json(); })
      // parse the JSON from the server; response.json also returns a Promise that
      // resolves into the JSON content
      .then(gList => {
        console.log(gList);
        //setRestaurants(gList.businesses);
        sendToServer(gList.businesses);

        console.log("Leaving getRestuarants()")
      });
  }

  const sendToServer = (restaurantList) => {
    console.log("Sending this to servers: ", restaurantList)
    fetch('/restList', {
      method: 'POST',
      body: JSON.stringify({
        Restaurants: restaurantList
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function (response) {

        return response.json()
      }).then(function (body) {
        console.log(body);

      });
  }
  const handleClick = () => {
    setupGame();
    Modal.info({
      title: 'Visit the link to start playing! You can also share the link with your friends so they can join!',
      content: (
        //TODO: the link in modal is hardcoded. Change it.
        //FIXME: User beside host can't enter room. Ask TA
        <div>
          <a href={`${window.location.href}gameroom/${props.roomID}`}>{`${window.location.href}gameroom/${props.roomID}`}</a>
          <div>IMPORTANT: You must not close or refresh this host page while game is in process. Or else the game won't work.</div>
        </div>
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
