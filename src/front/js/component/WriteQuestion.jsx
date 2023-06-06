import React, {useState} from "react";

const WriteQuestion = ({questionChange, questionSubmit}) => {

  const [view, setView] = useState(false);

  const openForm = () => {
    setView(!view);
  };

  return (
   <>
   <div className="col-8 mt-2 d-flex justify-content-start">
   {!view ? (
        <button onClick={openForm} type="button" className="btn btn-success">
          Haz tu pregunta
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
          onChange={questionChange}
          onSubmit={questionSubmit}
        >
          <div className="col-12 mt-2 d-flex justify-content-center">
            <div className="card card-stars p-2">
              <div className="mb-3">
                <label htmlFor="valoracion" className="form-label">
                  Puedes hacerle una pregunta a este abogado
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

export default WriteQuestion
