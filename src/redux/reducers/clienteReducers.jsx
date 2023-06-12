// clienteReducer.js
const initialState = {
  clientes: [],
  loading: false,
  error: null,
};

const clienteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CLIENTES_REQUEST":
    case "ACTUALIZAR_CLIENTE_REQUEST":
    case "CREAR_CLIENTE_REQUEST":
    case "ELIMINAR_CLIENTE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_CLIENTES_SUCCESS":
      return {
        ...state,
        clientes: action.payload,
        loading: false,
      };
    case "ACTUALIZAR_CLIENTE_SUCCESS":
      return {
        ...state,
        clientes: state.clientes.map((cliente) =>
          cliente.id === action.payload.id ? action.payload : cliente
        ),
        loading: false,
      };
    case "CREAR_CLIENTE_SUCCESS":
      return {
        ...state,
        clientes: [...state.clientes, action.payload],
        loading: false,
      };
    case "ELIMINAR_CLIENTE_SUCCESS":
      return {
        ...state,
        clientes: state.clientes.filter(
          (cliente) => cliente.id !== action.payload
        ),
        loading: false,
      };
    case "FETCH_CLIENTES_FAILURE":
    case "ACTUALIZAR_CLIENTE_FAILURE":
    case "CREAR_CLIENTE_FAILURE":
    case "ELIMINAR_CLIENTE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default clienteReducer;
