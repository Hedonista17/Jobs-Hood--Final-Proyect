import React from "react";
import { Link } from "react-router-dom";
import "../../styles/link-button.css";

const LinkButton = ({direction, text, type, altColor}) => {

  const buttonClass = altColor ? "btn btn-secondary" : "btn btn-success";

  return (
    <div>
        <Link to={`${direction}`}>
      <button id="link-button" type={type} className={buttonClass}>
        {text}
      </button>
      </Link>
    </div>
  );
};

export default LinkButton;
