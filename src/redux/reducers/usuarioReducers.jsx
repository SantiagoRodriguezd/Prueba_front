import {
  FETCH_USUARIOS_ROLES_REQUEST,
  FETCH_USUARIOS_ROLES_SUCCESS,
  FETCH_USUARIOS_ROLES_FAILURE,
} from "../actions/usuarioActions";
const initialState = {
  usuariosRoles: [],
  loading: false,
  error: null,
};

const usuarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USUARIOS_ROLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USUARIOS_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        usuariosRoles: action.payload,
      };
    case FETCH_USUARIOS_ROLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usuarioReducer;
