import axios from "axios";

export const fetchProductos = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_PRODUCTOS_REQUEST" });

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/productos/");
      const productos = response.data;
      dispatch({ type: "FETCH_PRODUCTOS_SUCCESS", payload: productos });
    } catch (error) {
      dispatch({ type: "FETCH_PRODUCTOS_FAILURE", payload: error.message });
    }
  };
};

export const actualizarProducto = (id, datos) => {
  return async (dispatch) => {
    dispatch({ type: "ACTUALIZAR_PRODUCTOS_REQUEST" });

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/productos/${id}/`,
        datos
      );

      const productoActualizado = response.data;

      dispatch({
        type: "ACTUALIZAR_PRODUCTOS_SUCCESS",
        payload: productoActualizado,
      });
      dispatch(fetchProductos());
    } catch (error) {
      dispatch({
        type: "ACTUALIZAR_PRODUCTOS_FAILURE",
        payload: error.message,
      });
    }
  };
};

export const crearProducto = (nuevoProducto) => {
  return async (dispatch) => {
    dispatch({ type: "CREAR_PRODUCTOS_REQUEST" });

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/crear_producto/`,
        nuevoProducto
      );
      const productos = response.data;
      dispatch({ type: "CREAR_PRODUCTOS_SUCCESS", payload: productos });
      dispatch(fetchProductos());
    } catch (error) {
      dispatch({ type: "CREAR_PRODUCTOS_FAILURE", payload: error.message });
    }
  };
};

export const eliminarProducto = (id) => {
  return async (dispatch) => {
    dispatch({ type: "ELIMINAR_PRODUCTOS_REQUEST" });

    try {
      await axios.delete(`http://127.0.0.1:8000/api/productos/${id}/eliminar/`);
      dispatch({ type: "ELIMINAR_PRODUCTOS_SUCCESS", payload: id });
      dispatch(fetchProductos());
    } catch (error) {
      dispatch({ type: "ELIMINAR_PRODUCTOS_FAILURE", payload: error.message });
    }
  };
};
