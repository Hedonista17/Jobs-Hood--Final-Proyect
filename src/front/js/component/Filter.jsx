import React from "react";
import StarRatings from "react-star-ratings";

const Filter = ({
  filter,
  setFilter,
  provinces,
  minAverageRating,
  setMinAverageRating,
}) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setMinAverageRating(newRating);
  };

  const handleReset = () => {
    setMinAverageRating(0);
    setFilter("");
  };

  return (
    <div className="card card-filter p-3 mt-1" style={{width: "18rem"}}>
      <div className="filter-component">
        <label htmlFor="filter">Filtrar por provincia: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="">Todas las provincias</option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>

        <label htmlFor="rating">Calificación mínima: </label>
        <StarRatings
          rating={minAverageRating}
          starRatedColor="#ffd700"
          changeRating={handleRatingChange}
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="2px"
          starHoverColor="#1B5C3F"
        />
        <div className="row row-filter">
          {" "}
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-success"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
