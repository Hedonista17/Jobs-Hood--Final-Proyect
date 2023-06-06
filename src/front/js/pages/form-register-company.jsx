import React, {useState, useEffect} from "react";
import {companyRegister} from "../services/company.js";
import {checkUser} from "../services/user.js";
import {useNavigate} from "react-router-dom";
import Form from "../component/Form.jsx";
import Spinner from "../component/Spinner.jsx";
import Alert from "../component/Alert.jsx";
import {Navbar} from "../component/navbar.js";
import "../../styles/company-register.css";

const initialState = {
  user_name: "",
  name: "",
  last_name: "",
  email: "",
  password: "",
  province: "",
  cif: "",
  address: "",
};

export const RegisterCompany = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");

  // Función que actualiza el user_name basado en el campo email
  const updateUserName = (email) => {
    const userName = email.replace(/\s+/g, ""); // Elimina espacios en blanco
    setForm({...form, user_name: userName});
  };

  // Actualiza el user_name cada vez que el campo email cambia
  useEffect(() => {
    updateUserName(form.email);
  }, [form.email]);

  const handleChange = (e) => {
    const value = e.target.value; //se obtiene el valor del input
    const name = e.target.name; //se obtiene el nombre del campo del input
    setForm({...form, [name]: value}); //se añade el valor al campo de nombre de input haciendo una copia del objeto
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);
    const check = await checkUser(form);
    setAlert(true);
    setClassName("danger");
    setMessage(check.msg);
    setAlert(false);
    if (!check.error) {
      try {
        const register = await companyRegister(form);
        if (register) {
          setAlert(true);
          setClassName("success");
          setMessage(register.msg);
          setTimeout(() => {
            setAlert(false);
            navigate("/login");
          }, 1500);
        }
      } catch (error) {
        setAlert(true);
        setClassName("danger");
        setMessage("Error del servidor");
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      }
    } else {
      setAlert(true);
    }
    setSpinner(false);
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <div className="company-register">
            <Navbar />
            <div className="container-register">
              <div className="card card-form p-5 m-5">
                {alert && (
                  <div className="d-flex justify-content-center m-5">
                    <Alert className={className} message={message} />
                  </div>
                )}
                <Form
                  userType="company"
                  form={form}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
