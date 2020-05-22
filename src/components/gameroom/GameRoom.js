import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';

const GameRoom = () => {
  // @restaurants: list of restaurants from Yelp API
  const [restaurants, setRestaurants] = useState([]);

  return (
    <div>
      GAME ROOM
      <RestaurantCard />
    </div>

  );
}

const Styles = {};

export default GameRoom;
