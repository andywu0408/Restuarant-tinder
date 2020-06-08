import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

const { Meta } = Card;

const RestaurantCard = props => {
  const {
    name,
    picURL,
    rating,
    numReviews,
    priceRange,
    numTimesChosen,
  } = props;

  const getStars = () => {
    console.log("In getSTars()...")
    let hasDecimal = (rating - Math.floor(rating)) !== 0;
    let stars = [];

    let temp = Math.floor(rating)

    for (let i = 0; i < temp; i++) {

      stars.push(faStar);
    }
    if (hasDecimal) {
      stars.push(faStarHalfAlt)
    }
    console.log("Stars[]= " + stars)
    return (

      <div>
        {stars.map(e => (
          <FontAwesomeIcon icon={e} />
        ))}
      </div>
    )
  }
  return (
    <Card
      hoverable
      style={{
        width: 270, margin: 'auto', position: 'absolute', marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center'
      }}
      cover={<img style={{ objectFit: 'cover', height: 350 }} alt="example" src={picURL} />}
    >
      <Meta
        title={
          <div style={{
            fontSize: 24, fontWeight: 'bolder', whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {name}
          </div>}
        description={
          <div style={{ fontSize: 20 }}>
            <div>{getStars()}</div>
            <div>Price: {priceRange}</div>
            <div>Chosen {numTimesChosen} time(s)!</div>
          </div>

        }
      />
    </Card>
  );
}


export default RestaurantCard;
