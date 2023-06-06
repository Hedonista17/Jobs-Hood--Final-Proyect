import React, {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {registerUser, checkUser} from "../services";
import FormUser from "../component/FormUser.jsx";
import Spinner from "../component/Spinner.jsx";
import Alert from "../component/Alert.jsx";
import {Navbar} from "../component/navbar.js";
import "../../styles/worker-register.css";

export const RegistroWorker = () => {
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");
  const navigate = useNavigate();

  const [registro, setRegistro] = useState({
    user_name: "",
    password: "",
    name: "",
    last_name: "",
    email: "",
  });

  const handleChange = ({target}) => {
    // el valor que se escriba en el form se sustituye en el campo name de cada apartado del objeto,
    setRegistro({...registro, [target.name]: target.value}); // se setean los cambios en el usestate de registro
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);
    const check = await checkUser(registro, "register");
    if (!check.error) {
      try {
        const register = await registerUser(registro);
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
        setSpinner(false);
        setAlert(true);
        setClassName("danger");
        setMessage("Error del servidor");
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      }
    } else {
      setAlert(true);
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
          <div className="worker-register">
            <Navbar />
            <div className="container-register">
              <div className="card card-form p-5 m-5">
                {alert && (
                  <div className="d-flex justify-content-center m-5">
                    <Alert className={className} message={message} />
                  </div>
                )}
                <FormUser
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
