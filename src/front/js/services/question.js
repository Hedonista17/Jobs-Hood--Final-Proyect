import {URL} from ".";


export const createQuestion = async (data) => {
  try {
    const token = localStorage.getItem("token")
    const info = await fetch(`${URL}/question`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    console.log(info)
    return await info.json();
  } catch (error) {
    console.log("Error creando la pregunta:", error);
  }
};

export const checkQuestion = (user, lawyerId) => {
  const questions = user["written_questions"];
  if (questions && questions.length > 0) {
    return questions.some((receiver) => receiver["lawyer_id"] == lawyerId); //questions.some() devuelve true si encuentra un receiver con lawyer_id igual a lawyerId, y false en caso contrario
  }
  return false;
};

export const createAnswer = async (data, id) =>{
try {
  const token = localStorage.getItem("token")
  const info = await fetch (`${URL}/question/comment/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      redirect: "follow"
    },
  });
  return await info.json();
  
} catch (error) {
  console.log(error)
}

}
