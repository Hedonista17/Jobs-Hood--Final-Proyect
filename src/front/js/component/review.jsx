import React from "react";
import {Link} from "react-router-dom";
import StarRatings from 'react-star-ratings';

const Review = (props) => {
  
  return (
    <div className="col-8 mt-2 d-flex justify-content-center">
      <div className="card card-stars p-3">
        <StarRatings
          rating={props.rating}
          numberOfStars={5}
          starDimension="24px"
          starSpacing="3px"
          starRatedColor="#ffd700"
          starHoverColor="#1B5C3F"
        />
        <p className="card-text">{props.text}</p>
        <Link to={`/worker/${props.userID}`}>
          <p className="card-text">{props.user_name}</p>
        </Link>
        {props.opinion && (
          <Link to={`/${props.type}/${props.receiver_id}`}>
            <p className="card-text">Ver Opinión</p>
          </Link>
        )}

        <p className="card-text card-datetime">{props.data}</p>
      </div>
    </div>
  );
};

export default Review;
