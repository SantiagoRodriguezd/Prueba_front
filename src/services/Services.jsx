import axios from "axios";

export const getProductById = (id) => {
  return axios.get(`http://127.0.0.1:8000/api/detalle_producto/${id}`);
};

export const getClienteByDocumento = (documento) => {
  return axios.get(`http://127.0.0.1:8000/api/cliente/${documento}`);
};

export const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8000/api/login/", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const register = async (username, password) => {
  try {
    await axios.post("http://localhost:8000/api/registro/", {
      username,
      password,
    });
    return true;
  } catch (error) {
    throw error.response.data;
  }
};
export const searchProductoById = (id) => {
  return axios
    .get(`http://127.0.0.1:8000/api/detalle_producto/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error("Error al buscar el producto por ID");
    });
};
export async function getProductos() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/productos/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la lista de productos");
  }
}
