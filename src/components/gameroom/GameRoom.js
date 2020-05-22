import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import RestaurantCard from './RestaurantCard';

const GameRoom = () => {
  // @restaurants: list of restaurants from Yelp API
  const [restaurants, setRestaurants] = useState([]);

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (
    <div
      style={Styles.mainContainer}
    >
      <div style={Styles.title}>
        Restaurant Tinder's Game Room
      </div>
      <div style={Styles.cardContainer}>
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
          <RestaurantCard rating="3/5 stars" numReviews="129" priceRange="$100-200" picURL="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" numTimesChosen="5" name="mcdonald" />
        </TinderCard>
      </div>
    </div>

  );
}

const Styles = {
  mainContainer: {
    background: 'linear-gradient(#ff7e5f, #feb47b)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  title: {
    // fontFamily: 'Damion, sans-serif',
    fontSize: 45,
    color: 'white'
  },
  cardContainer: {
    marginTop: 36,
  }
};

export default GameRoom;
