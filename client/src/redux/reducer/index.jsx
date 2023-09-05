import { ERROR, GET_PODUCT_SUCCESS, GET_PRODUCT_DETAIL } from "../actions/index";

const initialState = {
  products: [],
  productDetails: {},
  error: "", // Agrega un campo de error para manejar los errores.
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload, 
        error: "",
      };
      case GET_PRODUCT_DETAIL:
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            [action.payload.sku]: action.payload, // Usamos el SKU como clave
          },
          error: "",
        };
        
    default:
      return state;
  }
};

export default rootReducer;
