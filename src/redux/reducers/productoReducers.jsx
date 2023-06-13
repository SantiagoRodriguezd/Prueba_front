const initialState = {
  productos: [],
  loading: false,
  error: null,
};

const productoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTOS_REQUEST":
    case "ACTUALIZAR_PRODUCTOS_REQUEST":
    case "CREAR_PRODUCTOS_REQUEST":
    case "ELIMINAR_PRODUCTOS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PRODUCTOS_SUCCESS":
      return {
        ...state,
        productos: action.payload,
        loading: false,
      };
    case "ACTUALIZAR_PRODUCTOS_SUCCESS":
      return {
        ...state,
        productos: state.productos.map((producto) =>
          producto.id === action.payload.id ? action.payload : producto
        ),
        loading: false,
      };

    case "CREAR_PRODUCTOS_SUCCESS":
      return {
        ...state,
        productos: [...state.productos, action.payload],
        loading: false,
      };
    case "ELIMINAR_PRODUCTOS_SUCCESS":
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id !== action.payload
        ),
        loading: false,
      };

    case "FETCH_PRODUCTOS_FAILURE":
    case "ACTUALIZAR_PRODUCTOS_FAILURE":
    case "CREAR_PRODUCTOS_FAILURE":
    case "ELIMINAR_PRODUCTOS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productoReducer;
