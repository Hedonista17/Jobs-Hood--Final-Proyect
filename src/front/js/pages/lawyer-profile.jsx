import React, {useEffect, useState, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {changePassword, getUserPrivate, userById} from "../services";
import UserInfo from "../component/UserInfo.jsx";
import {Tab, Nav} from "react-bootstrap";
import {createReview, checkReview} from "../services/review.js";
import {createQuestion, createAnswer} from "../services/question";
import Review from "../component/review.jsx";
import Questions from "../component/questions.jsx";
import Answers from "../component/Answers.jsx";
import WriteReview from "../component/WriteReview.jsx";
import WriteQuestion from "../component/WriteQuestion.jsx";
import WriteAnswer from "../component/WriteAnswer.jsx";
import LinkButton from "../component/LinkButton.jsx";
import Spinner from "../component/Spinner.jsx";
import {Context} from "../store/appContext.js";
import AverageRating from "../component/AverageRating.jsx";
import {Navbar} from "../component/navbar.js";
import Modal from "../component/Modal.jsx";
import "../../styles/lawyer-profile.css";
import Alert from "../component/Alert.jsx";

export const LawyerProfile = () => {
  const params = useParams();
  const [lawyer, setLawyer] = useState({});
  const [review, setReview] = useState([]);
  const [question, setQuestion] = useState([]);
  const [activeKey, setActiveKey] = useState("#nav-home");
  const [canWrite, setCanWrite] = useState(false);
  const [canAsk, setCanAsk] = useState(false);
  const [opinion, setOpinion] = useState({
    receiver_id: 0,
    author_id: 0,
    rating: 0,
    text: "",
    user_name: "",
  });
  const [ask, setAsk] = useState({
    lawyer_id: 0,
    user_id: 0,
    text: "",
    user_name: "",
  });
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const {store, actions} = useContext(Context);
  const [answer, setAnswer] = useState({});
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    password_check: "",
  });
  const [show, setShow] = useState(false);
  const [small, setSmall] = useState(false);
  const [passWrong, setPassWrong] = useState(false);
  const [passOk, setPassOk] = useState(false);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");

  const handleShow = () => {
    setShow(!show);
  };

  const token = localStorage.getItem("token"); //el token del usuario que está logado, si es que hay alguien logado

  const getInfoUser = async () => {
    if (params.id) {
      //perfil publico
      const info = await userById(params.id); //llamamos a la función que obtiene un USER filtrando por su ID
      return info.data;
    } //perfil privado
    const lawyerData = await getUserPrivate();
    return lawyerData;
  };

  const fetchData = async () => {
    try {
      const lawyerId = params.id; //parámetro que puede llegar o no desde la URL (ver layout.js)
      setSpinner(true);
      const screenUser = await getInfoUser();
      actions.setUser(screenUser);
      setLawyer(screenUser.lawyer);
      setReview(screenUser.received_reviews);
      setQuestion(screenUser.received_questions);
      if (token) {
        const role = localStorage.getItem("role"); //obtenemos el rol del localstorage
        const loggedUser = await getUserPrivate(); //obtenemos el usuario completo que está logado en este momento en la web
        const userHasReview = checkReview(loggedUser, lawyerId);
        if (role === "User" && !userHasReview) {
          setCanWrite(true);
        }
        if (role === "User") {
          setCanAsk(true);
        }
      }
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      setAlert(true);
      setMessage("error al traer los datos");
      setClassName("danger");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reviewChange = (e) => {
    const {name, value} = e.target;
    setOpinion({...opinion, [name]: value});
  };

  const reviewSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const userData = await getUserPrivate(token);
    const myOpinion = {
      ...opinion,
      receiver_id: params.id,
      author_id: userData.id,
      user_name: userData.user_name,
    };
    setOpinion(myOpinion);
    const response = await createReview(myOpinion);
    const newReviews = [...review, response.data];
    setReview(newReviews); // Actualizar la lista de revisiones
    setCanWrite(false);
    setSpinner(false);
  };
  const questionChange = (e) => {
    const {name, value} = e.target;
    setAsk({...ask, [name]: value});
  };

  const questionSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const userData = await getUserPrivate(token);
    const myQuestion = {
      ...ask,
      lawyer_id: params.id,
      user_id: userData.id,
      user_name: userData.user_name,
    };
    setAsk(myQuestion);
    const response = await createQuestion(myQuestion);
    const newQuestion = [...question, response.data];
    setQuestion(newQuestion);
    setCanAsk(false);
    setSpinner(false);
  };

  const answerChange = (e) => {
    const {name, value} = e.target;
    setAnswer({...answer, [name]: value});
  };

  const answerSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const userData = await getUserPrivate(token);
    const myAnswer = {
      ...answer,
      question_id: store.questionId,
      user_id: userData.id,
      name: userData.name,
    };
    const response = await createAnswer(myAnswer, store.questionId);
    setAnswer(myAnswer);
    actions.setQuestionId(0);
    await fetchData();
  };

  const handleEdit = async () => {
    navigate("/edit/profile-lawyer");
  };

  const passwordChange = ({target}) => {
    setPassword({...password, [target.name]: target.value});
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (password.new_password !== password.password_check) { //si las contraseñas no coinciden
      setSmall(true);
      setTimeout(() => {
        setSmall(false);
      }, 2000);
    } 
    else if (password.new_password.length < 8 || password.password_check.length < 8) { //si no tienen 8 caracteres
      setError(true);
    }
    else {
      const response = await changePassword(password);
      if (!response.error) {
        setPassOk(true);
        setTimeout(() => {
          setPassOk(false);
          setShow(false);
        }, 2000);
      } else {
        setPassWrong(true);
        setTimeout(() => {
          setPassWrong(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <div className="lawyer-profile">
            <Navbar />
            <div className="container container-fluid d-flex justify-content-center align-items-center">
              <div className="card card-form p-5 m-5">
              {alert && (
                  <div className="d-flex justify-content-center m-5">
                    <Alert className={className} message={message} />
                  </div>
                )}
                <UserInfo
                  user={store.user}
                  profile={lawyer}
                  showEditButton={!params.id}
                  onClick={handleEdit}
                  isLawyer={true}
                />
                {!params.id && (
                  <Modal
                    handlePassword={handlePassword}
                    passwordChange={passwordChange}
                    show={show}
                    handleShow={handleShow}
                    small={small}
                    passWrong={passWrong}
                    passOk={passOk}
                    error={error}
                  />
                )}
              </div>
            </div>

            <div className="container d-flex justify-content-center mt-1">
              <Nav
                variant="tabs"
                activeKey={activeKey}
                onSelect={(k) => setActiveKey(k)}
              >
                <Nav.Item>
                  <Nav.Link eventKey="#nav-home">Opiniones</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="#nav-questions">Preguntas</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            <Tab.Content>
              <Tab.Pane eventKey="#nav-home" active={activeKey === "#nav-home"}>
                <div className="container">
                  <div className="row m-5">
                    <div className="col-md-4">
                      <AverageRating reviews={review} />
                    </div>

                    <div className="col-md-8">
                      {!token && (
                        <LinkButton
                          direction={"/login"}
                          text={"Inicia sesión para poder dar tu opinión"}
                          type={"button"}
                        />
                      )}
                      {canWrite && (
                        <WriteReview
                          reviewChange={reviewChange}
                          reviewSubmit={reviewSubmit}
                        />
                      )}
                      {review.map((review, index) => (
                        <Review
                          key={index}
                          userID={review.author_id}
                          text={review.text}
                          opinion={false}
                          user_name={review.user_name}
                          rating={review.rating}
                          data={review.data_create}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Tab.Pane>

              <Tab.Pane
                eventKey="#nav-questions"
                active={activeKey === "#nav-questions"}
              >
                <div className="container">
                  <div className="container justify-content-center">
                    <div className="row d-flex justify-content-center m-5">
                      <div className="card-question col-9 p-1 mt-2">
                        {!token && (
                          <LinkButton
                            direction={"/login"}
                            text={"Inicia sesión para preguntarle al abogado"}
                            type={"button"}
                          />
                        )}

                        {canAsk && (
                          <WriteQuestion
                            questionChange={questionChange}
                            questionSubmit={questionSubmit}
                          />
                        )}

                        {question.map((question, index) => (
                          <div
                            key={index}
                            className="card-question col-9 p-1 mt-2"
                          >
                            <Questions
                              text={question.text}
                              user_name={question.user_name}
                              data={question.data_create}
                              userID={question.user_id}
                            />

                            {question.question_comment && (
                              <Answers comment={question.question_comment} />
                            )}

                            {!params.id && !question.question_comment && (
                              <WriteAnswer
                                answerChange={answerChange}
                                answerSubmit={answerSubmit}
                                questionId={question.id}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </>
      )}
    </>
  );
};
