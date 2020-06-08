import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import RestaurantCard from './RestaurantCard';
import { message, Spin } from 'antd';
import useForceUpdate from 'use-force-update';

//FIXME: fetching yelp API + setting restaurant list + setting numCards should be done in
// the selection screen(not created yet) and passed in as props. 
// home screen -> selection screen -> gameRoom

console.log(window.location.host+window.location.pathname)
const url = "ws://localhost:5000/gameroom"
const connection = new WebSocket(url);


const GameRoom = () => {

  const forceUpdate = useForceUpdate();
  const [Restaurants, setRestaurants] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  //const [shouldUpdateRound, updateRound] = useState(false);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    //send get request
    console.log("Call a post request to get restaurants from server.")
  }

  useEffect(() => {

  connection.onopen = () => {
    console.log("opened web socket")
    //connection.send(JSON.stringify({"type": "helloHost"}));
    let test = {
      'type' : "test",
      'num': "1001"
    }
    connection.send(JSON.stringify(test));
  };



  connection.onmessage = event => {
    console.log("in on message");
    let msgObj = JSON.parse(event.data);
    
    if(msgObj.type == "restlist")  {
      console.log(msgObj.name);
      msgObj.name.reverse();
      setRestaurants([...msgObj.name]);
      setIsLoaded(true);
    }
    else if(msgObj.type == "next"){
      console.log("rest list sent to SetRestaurants is: ", msgObj.value);
      msgObj.value.reverse();
      setRestaurants([...msgObj.value]);
      setIsLoaded(false);
      setIsLoaded(true);
      //msgObj.roundNum
    }
    else if(msgObj.type == "final") {

      console.log("THE FINAL WINNER IS.... ", msgObj.value);
      // TODO display winner somehow

    }


  };



});
  // TODO: if all users select this card, winner formed!
  const showSuccess = () => {
    let cmdObj = {
      "type": "command",
      "selection" :  1
    }
    message.success('Successfuly liked the restaurant', 0.5);
    connection.send(JSON.stringify(cmdObj));

  };
  // TODO: remove card from DB on failure
  const showFailure = () => {
    let cmdObj = {
      "type" : "command",
      "selection" : 0
    }
    message.error('Skipped!!!', 0.5);
    connection.send(JSON.stringify(cmdObj));

  };

  const onSwipe = (direction) => {
    if (direction === 'up' || direction === 'down') {
      return;
    }

    direction === 'right' ? showSuccess() : showFailure();
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (
    <div
      style={Styles.mainContainer}
    >
      <div style={Styles.titleContainer}>
        <div style={Styles.title}>
          Restaurant Tinder's Game Room
        </div>
      </div>

      <div style={Styles.cardContainer}>
        {isLoaded
          ? (Restaurants.map((restaurant) => (
            <TinderCard key={restaurant.name} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen(restaurant.name)} preventSwipe={['up', 'down']}>
              <RestaurantCard
                name={restaurant.name}
                rating={restaurant.rating} numReviews={restaurant.review_count}
                priceRange={restaurant.price} picURL={restaurant.img_url}
                numTimesChosen={restaurant.totalVotes} />
            </TinderCard>
          )))
          : (
            <div style={Styles.noCard}>
              <Spin size='large'>
                <h1 style={Styles.noCard}>WAITING FOR GAME TO START...</h1>
              </Spin>
            </div>
          )}
      </div>

    </div>

  );
}
const Styles = {
  mainContainer: {
    background: 'linear-gradient(#e66465, #9198e5)',
    width: '100vw',
    minHeight: '100vh',
    overflow: 'hidden',
    padding: '20px 300px'
  },
  noCard: {
    position: 'fixed', width: 300, padding: 24,
    bordeRadius: '1px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
  },
  title: {
    // fontFamily: 'Damion, sans-serif',
    fontSize: 45,
    color: 'white',
    top: 0,
  },
  cardContainer: {
    marginTop: 80,
    // position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default GameRoom;
