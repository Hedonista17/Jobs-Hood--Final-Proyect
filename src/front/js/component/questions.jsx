import React from "react";
import {Link} from "react-router-dom";

const Questions = ({text, user_name, data, userID, question, lawyer_id}) => {
  return (

    <div className="card card-stars mt-1">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <div className="text-left">
              <p>{text}</p>
              <Link to={`/worker/${userID}`}>
                <p>{user_name}</p>
              </Link>
              {question && (
                <Link to={`/lawyer/${lawyer_id}`}>
                  <p className="card-text">Ver pregunta</p>
                </Link>
              )}
              <p className="card-datetime">{data}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Questions;
