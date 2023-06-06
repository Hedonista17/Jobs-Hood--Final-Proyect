import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar.js";
import "../../styles/register.css";

export const Register = () => {
  return (
    <React.Fragment>
     
      <div className="register">
      <Navbar />
        <div className="container text-center mt-5">
          <h1 id="titulo-principal"> Bienvenido a <strong id="titulo-web">Jobs Hood!</strong></h1>
          <h3 id="titulo-secundario">¿A qué área pertenece?</h3>

          <div className="row">
            <div className="col mx-4">
              <Link to="lawyer">
                <div id="card" className="card w-100">
                  <div className="card-body" id="cuerpo-register">
                    <h5 className="card-title" id="titulo-register">Soy un Abogado/a</h5>
                    <span id="iconos" className="material-symbols-outlined">
                      balance
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col mx-4">
              <Link to="worker">
                <div id="card" className="card w-100">
                  <div className="card-body" id="cuerpo-register">
                    <h5 className="card-title" id="titulo-register">
                      Soy un Trabajador/a
                    </h5>
                    <span id="iconos" className="material-symbols-outlined">
                      group
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col mx-4">
              <Link to="company">
                <div id="card" className="card w-100">
                  <div className="card-body" id="cuerpo-register">
                    <h5 className="card-title" id="titulo-register"> Soy una  Empresa</h5>
                    <span id="iconos" className="material-symbols-outlined">
                      apartment
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
