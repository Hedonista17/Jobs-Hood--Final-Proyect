import React from 'react';
import StarRatings from 'react-star-ratings';

export function calculateAverageRating(reviews) {
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    return averageRating;
}

const AverageRating = ({ reviews }) => {
    const averageRating = calculateAverageRating(reviews);

    return (
        <div className=" average-rating card card-filter p-2" style={{width: "18rem"}}>
            <h6>Valoración media</h6>
            <StarRatings
              rating={averageRating}
              starRatedColor="#ffd700"
              numberOfStars={5}
              name='rating'
              starDimension="24px"
              starSpacing="1px"
            />
            <p>{averageRating.toFixed(2)} estrellas (de {reviews.length} opiniones)</p>
        </div>
    );
};

export default AverageRating;

