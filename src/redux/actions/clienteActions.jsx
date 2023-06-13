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

export const actualizarCliente = (documento, datos) => {
  return async (dispatch) => {
    dispatch({ type: "ACTUALIZAR_CLIENTE_REQUEST" });

    try {
      const response = await axios.put(
        `http://localhost:8000/api/clientes_actualizar/${documento}/`,
        datos
      );

      const cliente = response.data;
      dispatch({ type: "ACTUALIZAR_CLIENTE_SUCCESS", payload: cliente });
      dispatch(fetchClientes());
    } catch (error) {
      dispatch({ type: "ACTUALIZAR_CLIENTE_FAILURE", payload: error.message });
    }
  };
};

export const crearCliente = (nuevoCliente) => {
  return async (dispatch) => {
    dispatch({ type: "CREAR_CLIENTE_REQUEST" });

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/clientes/crear/`,
        nuevoCliente
      );
      const cliente = response.data;
      dispatch({ type: "CREAR_CLIENTE_SUCCESS", payload: cliente });
      dispatch(fetchClientes());
    } catch (error) {
      dispatch({ type: "CREAR_CLIENTE_FAILURE", payload: error.message });
    }
  };
};

export const eliminarCliente = (documento) => {
  return async (dispatch) => {
    dispatch({ type: "ELIMINAR_CLIENTE_REQUEST" });

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/clientes/${documento}/eliminar/`
      );
      dispatch({ type: "ELIMINAR_CLIENTE_SUCCESS", payload: documento });
      dispatch(fetchClientes());
    } catch (error) {
      dispatch({ type: "ELIMINAR_CLIENTE_FAILURE", payload: error.message });
    }
  };
};
