import { ERROR, GET_PODUCT_SUCCESS, GET_PRODUCT_DETAIL, FILTER_PRODUCTS } from "../actions/index";

const initialState = {
  products: [], // Mantén el estado original para todos los productos
  productDetails: {},
  error: "",
  filteredProducts: [], // Nuevo estado para los productos filtrados
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
          [action.payload.sku]: action.payload,
        },
        error: "",
      };

    case FILTER_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload, // Actualiza el estado con los productos filtrados
      };

    default:
      return state;
  }
};

export default rootReducer;
