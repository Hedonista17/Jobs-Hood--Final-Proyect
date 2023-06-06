import {URL} from ".";

export const createReview = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const info = await fetch(`${URL}/review`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        redirect: "follow",
      },
    });
    return await info.json();
  } catch (error) {
    console.log("Error creando la review:", error);
  }
};

export const checkReview = (user, receiverId) => {
  const reviews = user["written_reviews"];
  if (reviews && reviews.length > 0) {
    return reviews.some((receiver) => receiver["receiver_id"] == receiverId); //reviews.some() devuelve true si encuentra un receiver con receiver_id igual a receiverId, y false en caso contrario
  }
  return false;
};
