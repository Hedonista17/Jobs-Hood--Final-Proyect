import React from "react";

const Answers = ({comment}) => {
  return (
<div className="mt-1">
    <div className="card card-stars">
      <div className="card-body text-end">
      <div className="row">
      <div className="col-12">
      <div className="text-right">
        <p>{comment.text}</p>
        <p>{comment.name}</p>
        <p className="card-datetime">{comment.data_create}</p>
        </div>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
};


export default Answers; 
