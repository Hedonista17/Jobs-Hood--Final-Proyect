import React from "react";
import "../../styles/user-info.css"

const UserWorker = ({user, userPrivate, showEditButton, onClick}) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <img className="imagenContacto" src={user.avatar} />
      </div>
      <div className="col-lg-7">
        <div className="nombre-contacto"> 
          <strong className="user-name-worker">{user.user_name}</strong>
          {userPrivate && (
            <>
              <div className="iconos my-2"> {user.name}</div>
              <div className="iconos my-2"> {user.last_name}</div>
              <div className="iconos my-2"> {user.email}</div>
            </>
          )}
          <div>
            <p>{user.description}</p>
          </div>
        </div>
      </div>
      {showEditButton && (
        <div className="col-lg-2 d-flex">
          <i className="material-symbols-outlined"  onClick={onClick}
            title="Editar Contacto">edit</i>
        </div>
      )}
    </div>
  );
};

export default UserWorker;
