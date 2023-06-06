import React, {useState, useEffect} from "react";
import {registerLawyer} from "../services/lawyer.js";
import {checkUser} from "../services/user.js";
import {useNavigate} from "react-router-dom";
import Form from "../component/Form.jsx";
import Spinner from "../component/Spinner.jsx";
import Alert from "../component/Alert.jsx";
import {Navbar} from "../component/navbar.js";
import "../../styles/lawyer-register.css";

export const RegistroLawyer = () => {
  const initialState = {
    user_name: "",
    password: "",
    name: "",
    last_name: "",
    email: "",
    address: "",
    province: "",
    col_number: "",
  };

  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");

  // Función que actualiza el user_name basado en el campo email
  const updateUserName = (email) => {
    const userName = email.replace(/\s+/g, "");
    setForm({...form, user_name: userName});
  };

  // Actualiza el user_name cada vez que el campo email cambia
  useEffect(() => {
    updateUserName(form.email);
  }, [form.email]);

  const handleChange = (e) => {
    // el valor que se escriba en el form se sustituye en el campo name de cada apartado del objeto,
    const {name, value} = e.target;
    setForm({...form, [name]: value}); // se setean los cambios en el usestate de form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const check = await checkUser(form, "register");
    if (!check.error) {
      try {
        const register = await registerLawyer(form);
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
      setAlert(true); //error
      setClassName("danger");
      setMessage(check.msg);
    }
    setSpinner(false);
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <div className="lawyer-register">
            {" "}
            <Navbar />
            <div className="container-register">
            <div className="card card-form p-5 m-5">
              {alert && (
                <div className="d-flex justify-content-center m-5">
                  <Alert className={className} message={message} />
                </div>
              )}
              <Form
                userType="lawyer"
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
