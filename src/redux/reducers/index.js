import { combineReducers } from "redux";
import clienteReducer from "./clienteReducers";
import usuarioReducer from "./usuarioReducers";
import productoReducer from "./productoReducers";

const rootReducer = combineReducers({
  clientes: clienteReducer,
  usuarioRol: usuarioReducer,
  productos: productoReducer,
});

export default rootReducer;
