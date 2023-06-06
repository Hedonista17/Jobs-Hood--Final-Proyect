import React from "react";
import {FaUpload} from "react-icons/fa";
import "../../styles/avatar.css";

export const Avatar = ({handleChange, fileUrl, file}) => {
     
    return (
      <div className="input-group d-flex flex-column gap-2 align-items-start mb-3 avatar_container">
        
        <div className="row preview">
          <div className="col-12">
            <img className="imagenContacto" src={fileUrl}></img>
          </div>
        </div>
        <div className="row">
          <div className="col">

            <label className="file" htmlFor="file">
              <span className="file_text">Elija una imagen</span>
              <span className="file_ico"><FaUpload/></span>
            </label>
            <input id="file" type="file"onChange={handleChange}></input>
          </div>
        </div>
      </div>
    );
  };

export default Avatar;