export const FETCH_USUARIOS_ROLES_REQUEST = "FETCH_USUARIOS_ROLES_REQUEST";
export const FETCH_USUARIOS_ROLES_SUCCESS = "FETCH_USUARIOS_ROLES_SUCCESS";
export const FETCH_USUARIOS_ROLES_FAILURE = "FETCH_USUARIOS_ROLES_FAILURE";

import axios from "axios";

export const fetchUsuariosRoles = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USUARIOS_ROLES_REQUEST });

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/usuarios/");
      const usuariosRoles = response.data;
      dispatch({
        type: FETCH_USUARIOS_ROLES_SUCCESS,
        payload: usuariosRoles,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USUARIOS_ROLES_FAILURE,
        payload: error.message,
      });
    }
  };
};
