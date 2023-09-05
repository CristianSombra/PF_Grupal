import { ERROR, GET_PODUCT_SUCCESS, GET_PRODUCT_DETAIL, FILTER_PRODUCTS, SORT_PRODUCTS_BY_PRICE, CREATE_PRODUCT } from "../actions/index";

const initialState = {
  products: [], // Mantén el estado original para todos los productos
  productDetails: {},
  error: "",
  filteredProducts: [], // Nuevo estado para los productos filtrados
  orderByPrice: 'asc', // Nuevo estado para el orden por precio
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

    case SORT_PRODUCTS_BY_PRICE:
      return {
         ...state,
        orderByPrice: action.payload, // Actualiza el estado con el nuevo orden
       };
    case CREATE_PRODUCT:
      return {
        ...state,
        creatingProduct: false,
        creatinProductError: null,
       };

    default:
      return state;
  }
};

export default rootReducer;
