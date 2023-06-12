import { combineReducers } from "redux";
import clienteReducer from "./clienteReducers";

const rootReducer = combineReducers({
  clientes: clienteReducer,
});

export default rootReducer;
