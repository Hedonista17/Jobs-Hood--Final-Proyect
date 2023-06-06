import React, {useState, useContext} from "react";
import {Context} from "../store/appContext.js";
import LinkButton from "../component/LinkButton.jsx";
import { editUser} from "../services/user.js";
import Spinner from "../component/Spinner.jsx";
import {useNavigate} from "react-router-dom";
import {checkUser} from "../services/user.js";
import Avatar from "../component/avatar.jsx";
import Alert from "../component/Alert.jsx";
import {Navbar} from "../component/navbar.js";
import "../../styles/edit-profile-worker.css";

export const EditProfileWorker = () => {
  const {store, actions} = useContext(Context);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [editedWorker, setEditedWorker] = useState({
    user_name: store.user.user_name,
    name: store.user.name,
    last_name: store.user.last_name,
    email: store.user.email,
    description: store.user.description,
  });
  const [formView, setFormView] = useState(true);
  const [currentImage, setCurrentImage] = useState(store.user.avatar)

  const handleChange = (event) => {
    if (event.target.files) {
      setCurrentImage(null);
      setFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setFileUrl(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      const {name, value} = event.target;
      setEditedWorker((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    setSpinner(true);
    event.preventDefault();
    let check;
    let mail = false;
    if (store.user.email !== editedWorker.email) {
      // si el email ha cambiado
      check = await checkUser(editedWorker, "editMail"); // el parametro para editar
      mail = true;
    } else if (store.user.user_name !== editedWorker.user_name) {
      //si el user_name ha cambiado
      check = await checkUser(editedWorker, "editUserName"); // el parametro para editar
    }
    if (check) {
      if (!check.error) {
        try {
          const response = await editUser(editedWorker, file);
          if (response) {
            actions.setUser(editedWorker);
            if (mail) {
              localStorage.setItem("token", response); // Guardamos el nuevo token en el localStorage
            }
            setAlert(true);
            setClassName("success");
            setMessage("Usuario editado correctamente");
            setFormView(false);
            setTimeout(() => {
              setAlert(false);
              navigate("/worker/profile");
            }, 1500);
            setSpinner(false);
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
        setSpinner(false);
        setAlert(true);
        setClassName("danger");
        setMessage(check.msg);
        editedWorker.user_name = store.user.user_name;
        editedWorker.name = store.user.name;
        editedWorker.last_name = store.user.last_name;
        editedWorker.description = store.user.description;
      }
    } else {
      // si no cambia ni email ni user_name
      try {
        const response = await editUser(editedWorker, file);
        if (response) {
          setAlert(true);
          setClassName("success");
          setMessage("Usuario editado correctamente");
          setFormView(false);
          setTimeout(() => {
            setAlert(false);
            navigate("/worker/profile");
          }, 1500);
          setSpinner(false);
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
    }
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="edit-worker-profile">
          <Navbar />
          {alert && (
            <div className="d-flex justify-content-center m-5">
              <Alert className={className} message={message} />
            </div>
          )}
          {formView && (
            <div className="card card-form p-5 m-5">
              <form onSubmit={handleSubmit}>
                <div className="row my-3">
                  <div className="col">
                    <Avatar
                      handleChange={handleChange}
                      fileUrl={fileUrl || currentImage}
                      file={file}
                    />
                  </div>
                </div>

                <div className="row align-items-start my-3">
                  <div className="col">
                    <label
                      htmlFor="form-register-worker"
                      className="form-label"
                    >
                      Nombre de Usuario
                    </label>
                    <input
                      onChange={handleChange}
                      defaultValue={store.user.user_name}
                      type="text"
                      name="user_name"
                      title="Please enter a valid name"
                      className="form-control rounded-0"
                      maxLength="20"
                    />
                  </div>

                  <div className="col">
                    <label
                      htmlFor="form-register-worker"
                      className="form-label"
                    >
                      Nombre
                    </label>
                    <input
                      onChange={handleChange}
                      defaultValue={store.user.name}
                      type="text"
                      name="name"
                      className="form-control rounded-0"
                      maxLength="30"
                    />
                  </div>
                </div>
                <div className="row align-items-start my-3">
                  <div className="col">
                    <label
                      htmlFor="form-register-worker"
                      className="form-label"
                    >
                      Apellidos
                    </label>
                    <input
                      onChange={handleChange}
                      defaultValue={store.user.last_name}
                      type="text"
                      name="last_name"
                      className="form-control rounded-0"
                      maxLength="100"
                    />
                  </div>
                </div>

                <div className="row align-items-end my-3">
                  <div className="col">
                    <label
                      htmlFor="form-register-worker"
                      className="form-label"
                    >
                      Dirección Email
                    </label>
                    <input
                      onChange={handleChange}
                      defaultValue={store.user.email}
                      type="email"
                      name="email"
                      className="form-control rounded-0"
                      maxLength="100"
                    />
                  </div>
                </div>
                <div className="row align-items-start my-3">
                  <div className="col">
                    <label
                      htmlFor="form-register-worker"
                      className="form-label"
                    >
                      Descripción
                    </label>
                    <textarea
                      onChange={handleChange}
                      defaultValue={store.user.description}
                      name="description"
                      className="form-control rounded-0"
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="d-flex">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Guardar Cambios"
                  ></input>
                  <LinkButton className="btn-secondary" direction="/worker/profile" text="Cancelar" altColor={true} />
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};
