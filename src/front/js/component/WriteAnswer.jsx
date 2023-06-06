import React, {useState, useContext} from "react";
import {Context} from "../store/appContext.js";

const WriteAnswer = ({answerChange, answerSubmit, questionId}) => {
  const {store, actions} = useContext(Context);
  const [view, setView] = useState(false);


  const openForm = () => {
    setView(!view);
    actions.setQuestionId(questionId);
  };


  return (
    <>
       <div className="col-9 mt-2 d-flex justify-content-start">
      {!view ? (
        <button onClick={openForm} type="button" className="btn btn-success">
          Responder
        </button>
      ) : (
        <button onClick={openForm} type="button" className="btn btn-secondary">
          Cerrar
        </button>
      )}
      </div>

      {view && (
        <form
          action=""
          className=""
          onChange={answerChange}
          onSubmit={answerSubmit}
        >
          <div className="col-12 mt-2 d-flex justify-content-center">
            <div className="card card-stars p-2">
              <div className="mb-3">
                <label htmlFor="valoracion" className="form-label">
                  Responder al usuario
                </label>
                <textarea
                  name="text"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  maxLength="700"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">
                Enviar
              </button>{" "}
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default WriteAnswer;
