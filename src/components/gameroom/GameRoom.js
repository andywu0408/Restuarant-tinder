import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import RestaurantCard from './RestaurantCard';
import { message, Spin } from 'antd';

//FIXME: fetching yelp API + setting restaurant list + setting numCards should be done in
// the selection screen(not created yet) and passed in as props. 
// home screen -> selection screen -> gameRoom
const GameRoom = () => {

  const [Restaurants, setRestaurants] = useState([]);
  // const [Restaurants, setRestaurants] = useState(db);
  const [numCards, setNumCards] = useState(0);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {

    let lurl = "https://api.yelp.com/v3/businesses/search?location=davis,ca,us";
    let kek = "https://cors-anywhere.herokuapp.com/"

    let url = kek + lurl;
    //GaS8MVZOoznvBJmkaZgAHxraTNOgmXnfQVffKpt-6WZZGNPSzL4MSzxFes2uD7V4Y-WqW0V_B_kLysY1TBHGShW9_n9O-vTkbSPqDabxNZPBdnFObQDAXes2UazHXnYx

    await fetch(url, {
      headers: {
        Authorization: 'Bearer GaS8MVZOoznvBJmkaZgAHxraTNOgmXnfQVffKpt-6WZZGNPSzL4MSzxFes2uD7V4Y-WqW0V_B_kLysY1TBHGShW9_n9O-vTkbSPqDabxNZPBdnFObQDAXes2UazHXnYx',
      }
    })
      // fetch returns a Promise the resolves into the response object
      .then(function (response) { return response.json(); })
      // parse the JSON from the server; response.json also returns a Promise that
      // resolves into the JSON content
      .then(function (gList) {
        console.log(gList);
        setNumCards(gList.total);
        console.log(numCards);
        setRestaurants(gList.businesses);
        console.log("Leaving getRestuarants()")

      });
  }
  // TODO: if all users select this card, winner formed!
  const showSuccess = () => {
    message.success('Successfuly liked the restaurant', 0.5);
  };
  // TODO: remove card from DB on failure
  const showFailure = () => {
    message.error('Skipped!!!', 0.5);
  };
  const onSwipe = (direction) => {
    if (direction == 'up' || direction == 'down') {
      return;
    }
    direction == 'right' ? showSuccess() : showFailure();
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
    setNumCards(numCards - 1);
    console.log(numCards)
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
        {Restaurants.length != 0
          ? (Restaurants.map((restaurant) => (
            <TinderCard key={restaurant.name} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen(restaurant.name)} preventSwipe={['up', 'down']}>
              <RestaurantCard
                name={restaurant.name}
                rating={restaurant.rating} numReviews={restaurant.review_count}
                priceRange={restaurant.price} picURL={restaurant.image_url}
                numTimesChosen={0} />
            </TinderCard>
          )))
          : (
            <div style={Styles.noCard}>
              <Spin size='large'>
                <h1 style={Styles.noCard}>Fetching restaurants...</h1>
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
