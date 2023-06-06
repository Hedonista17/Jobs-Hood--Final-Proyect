import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

// este parametro user(linea 12) es el parametro que pasamos en en form-register-user.jsx como registro del useState
// body: el cuerpo de la peticion que vamos a enviar, los datos como parametros

export const registerLawyer = async (user) => {
  try {
    const response = await fetch(`${URL}/lawyer`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
    return await response.json()
  } catch (error) {
    console.log("Error al registrar el abogado", error);
    throw error
  }
};

export const GetAllLawyers = async () => {
  try {
    const response = await fetch(`${URL}/lawyer`, {
      method: "GET",
      redirect: "follow",
    });
    return await response.json();
  } catch (error) {
    console.log("Error en get:", error);
  }
};
export const editLawyer = async (lawyer, file) => {
  try {
    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append("avatar", file);
    form.append("user", JSON.stringify(lawyer));
    const response = await fetch(`${URL}/lawyer/edit`, {
      method: "PUT",
      body: form,
      headers: {
        Authorization: `Bearer ${token}` // para poder acceder a partes privadas tengo que pasar en headers este formato el token es una interpolacion ya que ira cambiando segun el user
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error al editar usuario!", error);
  }
}
