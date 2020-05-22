import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import RestaurantCard from './RestaurantCard';

const Restaurants = [
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
  { name: 'McDonalds', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
];

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
      <div style={Styles.titleContainer}>
        <div style={Styles.title}>
          Restaurant Tinder's Game Room
        </div>
      </div>

      <div style={Styles.cardContainer}>
        {Restaurants.map((restaurant) => (
          <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
            <RestaurantCard
              name={restaurant.name}
              rating={restaurant.rating} numReviews={restaurant.numReviews}
              priceRange={restaurant.priceRange} picURL={restaurant.picURL}
              numTimesChosen={restaurant.numTimesChosen} />
          </TinderCard>
        ))}
      </div>
    </div>

  );
}

const Styles = {
  mainContainer: {
    background: 'linear-gradient(#ff7e5f, #feb47b)',
    width: '100vw',
    minHeight: '100vh',
    overflow: 'hidden',
    padding: '100px 300px'
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
