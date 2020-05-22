import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import RestaurantCard from './RestaurantCard';
import { message, Spin } from 'antd';

// const Restaurants = [
//   { name: 'McDonalds1', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
//   { name: 'McDonalds2', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
//   { name: 'McDonalds3', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
//   { name: 'McDonalds4', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
//   { name: 'McDonalds5', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
//   { name: 'McDonalds6', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
//   { name: 'McDonalds7', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
//   { name: 'McDonalds8', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
//   { name: 'McDonalds9', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },
//   { name: 'McDonalds10', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' },

// ];

const GameRoom = () => {

  const [Restaurants, setRestaurants] = useState([]);
  //const [Restaurants, setRestaurants] = useState([{ name: 'McDonalds1', rating: '4/5 stars', numReviews: '120', priceRange: '$100-200', numTimesChosen: '20', picURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMP6hAScXYimuGMA9d7BnAkeZfBFMotESMyITAQrQ-Uxbe_io-&usqp=CAU' }]);
  const [numCards, setNumCards] = useState(0);

  const showSuccess = () => {
    message.success('Successfuly liked the restaurant', 0.5);
  };
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
                rating={restaurant.rating} numReviews={restaurant.numReviews}
                priceRange={restaurant.priceRange} picURL={restaurant.picURL}
                numTimesChosen={restaurant.numTimesChosen} />
            </TinderCard>
          )))
          : (
            <div style={Styles.noCard}>
              <Spin size='large'>
                <h1 style={Styles.noCard}>There is no availabe card right now...</h1>
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
    transform: 'translate(-50%, -50%)'
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
