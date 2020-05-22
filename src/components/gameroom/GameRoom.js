import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';

const GameRoom = () => {
  // @restaurants: list of restaurants from Yelp API
  const [restaurants, setRestaurants] = useState([]);

  return (
    <div
      style={Styles.mainContainer}
    >
      GAME ROOM
      <RestaurantCard />
    </div>

  );
}

const Styles = {
  mainContainer: {
    height: '100vh',
    background: 'linear-gradient(#ff7e5f, #feb47b)',
  }
};

export default GameRoom;
