import React, {useState} from "react";
import "../../styles/opinion.css";

const WriteReview = ({reviewChange, reviewSubmit}) => {
  const [view, setView] = useState(false);

  const openForm = () => {
    setView(!view);
  };

  return (
    <>
      {!view ? (
        <button onClick={openForm} type="button" className="btn btn-success">
          Deja tu valoración
        </button>
      ) : (
        <button onClick={openForm} type="button" className="btn btn-secondary">
          Cerrar
        </button>
      )}
     
      {view && (
        <form
          action=""
          className=""
          onChange={reviewChange}
          onSubmit={reviewSubmit}
        >
          <div className="col-8 mt-2 d-flex justify-content-center">
            <div className="card card-stars p-2">
              <div className="stars">
                <input id="radio1" type="radio" name="rating" value="5" />
                <label htmlFor="radio1">★</label>
                <input id="radio2" type="radio" name="rating" value="4" />
                <label htmlFor="radio2">★</label>
                <input id="radio3" type="radio" name="rating" value="3" />
                <label htmlFor="radio3">★</label>
                <input id="radio4" type="radio" name="rating" value="2" />
                <label htmlFor="radio4">★</label>
                <input id="radio5" type="radio" name="rating" value="1"/>
                <label htmlFor="radio5">★</label>
              </div>
              <div className="mb-3">
                <label htmlFor="valoracion" className="form-label">
                  Cuéntales a los demás tu opinión
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

export default WriteReview;
