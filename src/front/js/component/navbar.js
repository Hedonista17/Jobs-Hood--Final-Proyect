import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import DropdownMenu from "../component/Dropdown-Menu.jsx";
import ButtonsNavbar from "../component/register-and-login.jsx";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Lógica para verificar si el usuario tiene un token y establecer el estado isLoggedIn
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/">

          <img src={"https://res.cloudinary.com/dcgc2tppo/image/upload/v1685178940/logoweb_np1qti.png"} className="logo-web" alt="Logo" />
    
        </Link>
        {isLoggedIn ? <DropdownMenu /> : <ButtonsNavbar />}
      </div>
    </nav>
  );
};
