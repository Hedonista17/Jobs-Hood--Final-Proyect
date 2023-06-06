import React from "react";
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import "../../styles/card.css";

const Cards = ({ avatar, name, province, email, address, category, id, averageRating }) => {
  return (
    <div className="col-4 mt-1">
      <div className="all-cards-view card" style={{ width: "17rem" }}>
        <img className="card-img-top" src={avatar} alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div>
            <StarRatings
              rating={averageRating}
              starRatedColor="#ffd700"
              numberOfStars={5}
              name='rating'
              starDimension="24px"
              starSpacing="1px"
            />
          </div>
          <p className="card-text">{address}</p>
          <p className="card-text">{province}</p>
          <p className="card-text">{email}</p>

          <Link to={`/${category}/${id}`}>
            <button type="button" className="btn btn-success">
              Info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
