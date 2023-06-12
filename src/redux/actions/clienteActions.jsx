// clienteActions.js
import axios from "axios";

export const fetchClientes = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_CLIENTES_REQUEST" });

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/clientes/");
      const clientes = response.data;
      dispatch({ type: "FETCH_CLIENTES_SUCCESS", payload: clientes });
    } catch (error) {
      dispatch({ type: "FETCH_CLIENTES_FAILURE", payload: error.message });
    }
  };
};

export const actualizarCliente = (id, datos) => {
  return async (dispatch) => {
    dispatch({ type: "ACTUALIZAR_CLIENTE_REQUEST" });

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/clientes/${id}/`,
        datos
      );
      const cliente = response.data;
      dispatch({ type: "ACTUALIZAR_CLIENTE_SUCCESS", payload: cliente });
    } catch (error) {
      dispatch({ type: "ACTUALIZAR_CLIENTE_FAILURE", payload: error.message });
    }
  };
};

export const crearCliente = (datos) => {
  return async (dispatch) => {
    dispatch({ type: "CREAR_CLIENTE_REQUEST" });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/clientes/crear/",
        datos
      );
      const cliente = response.data;
      dispatch({ type: "CREAR_CLIENTE_SUCCESS", payload: cliente });
    } catch (error) {
      dispatch({ type: "CREAR_CLIENTE_FAILURE", payload: error.message });
    }
  };
};

export const eliminarCliente = (id) => {
  return async (dispatch) => {
    dispatch({ type: "ELIMINAR_CLIENTE_REQUEST" });

    try {
      await axios.delete(`http://127.0.0.1:8000/api/clientes/${id}/eliminar/`);
      dispatch({ type: "ELIMINAR_CLIENTE_SUCCESS", payload: id });
    } catch (error) {
      dispatch({ type: "ELIMINAR_CLIENTE_FAILURE", payload: error.message });
    }
  };
};
