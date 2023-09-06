
import { ERROR, GET_PODUCT_SUCCESS, GET_PRODUCT_DETAIL, SORT_PRODUCTS_BY_PRICE, CREATE_PRODUCT } from "../actions/index";

const initialState = {
  products: [], // Mantén el estado original para todos los productos
  productDetails: {},
  error: "",
  orderByPrice: null, // Usar null para indicar que no hay ordenamiento por defecto

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

    case CREATE_PRODUCT:
      return {
        ...state,
        creatingProduct: false,
        creatinProductError: null,
       };

      case SORT_PRODUCTS_BY_PRICE:
        return {
         ...state,
          orderByPrice: action.payload, 
       };
       
    default:
      return state;
  }
};

export default rootReducer;
