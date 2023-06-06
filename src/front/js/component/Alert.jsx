import React from "react";
import "../../styles/alert.css";

const Alert = ({className, message}) => {
  return (
    <div className={`alert alert-${className}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;

