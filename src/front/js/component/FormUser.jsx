import React from "react";
import LinkButton from "../component/LinkButton.jsx";

const FormUser = ({handleChange, handleSubmit}) => {
  //se necesita pasar los params como obj para que funcione

  return (
    <>
      {" "}
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <h2>CREAR NUEVA CUENTA</h2>
            <h5>Accede a todos los servicios de Jobs Hood !</h5>
          </div>
          <div className="button-exit">
            <LinkButton
              text={"Volver"}
              direction={"/register"}
              type={"button"}
              altColor={true}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <h4>Datos de Acceso</h4>
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <div className="row align-items-start my-3">
            <div className="col">
              <label htmlFor="form-register-worker" className="form-label">
                Nombre de Usuario
              </label>
              <input
                type="text"
                name="user_name"
                className="form-control rounded-0"
                placeholder="Usuario"
                maxLength="20"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="inputPassword6" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                className="form-control rounded-0"
                aria-labelledby="passwordHelpInline"
                placeholder="Debe tener entre 8-20 caracteres."
                minLength="8"
                maxLength="20"
                required
              />
            </div>
          </div>
          <div className="row align-items-start my-3">
            <div className="col">
              <label htmlFor="form-register-worker" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                className="form-control rounded-0"
                pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$"
                maxLength="20"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="form-register-worker" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                name="last_name"
                className="form-control rounded-0"
                pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$"
                maxLength="40"
              />
            </div>
          </div>
          <div className="row align-items-end my-3">
            <div className="col">
              <label htmlFor="form-register-worker" className="form-label">
                Dirección Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control rounded-0"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-success"
            value="Registrarme"
          ></input>
        </form>
      </div>
    </>
  );
};

export default FormUser;
