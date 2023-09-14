import { 
  ERROR, 
  GET_PODUCT_SUCCESS, 
  GET_PRODUCT_DETAIL, 
  SORT_PRODUCTS_BY_PRICE, 
  CREATE_PRODUCT,
  UPDATE_SEARCH_RESULTS,
  RESET_SELECTED_BRAND_CATEGORY,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  LOGOUT,
  ADD_TO_CART, 
  REMOVE_FROM_CART,
  CREATE_RATING, 
  GET_RATINGS, 
  SET_SHOW_RESULTS,
  
} from "../actions/index";


const initialState = {
  products: [], // Mantén el estado original para todos los productos
  productDetails: {},
  error: "",
  orderByPrice: null, // Usar null para indicar que no hay ordenamiento por defecto
  searchResults: [],
  SelectedBrand: (""),
  SelectedCategory: (""),
  items: [],
  user: null,
  loadedUser: null,
  updateUserInfoSuccess: false, // Para rastrear el éxito de la actualización
  updateUserInfoError: null, // Para rastrear errores de actualización
  cartItems: [],
  ratings: [],
  showResults : false, 
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
       

     case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
          searchResults: action.payload, // Actualiza los resultados de búsqueda
        };

     case RESET_SELECTED_BRAND_CATEGORY:
      return {
            ...state,
            SelectedBrand: "",
            SelectedCategory: "",
          };
         
     case LOGIN_SUCCESS:
              return {
                ...state,
                user: action.payload,
                error: null,
              };
      case LOGIN_FAIL:
              return {
                ...state,
                user: null,
                error: action.payload,
              };
      
      case CREATE_USER_SUCCESS:
              return {
                  ...state,
                  user: action.payload,
                  error: null,
                };
      case CREATE_USER_FAIL:
              return {
                  ...state,
                  user: null,
                  error: action.payload,
                }; 
      case LOAD_USER_SUCCESS:

      return {
        ...state,
        loadedUser: action.payload,
        error: null,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loadedUser: null,
        error: action.payload,
      };
      case UPDATE_USER_INFO_SUCCESS:
        return {
          ...state,
          updateUserInfoSuccess: true,
          updateUserInfoError: null,
        };
      case UPDATE_USER_INFO_FAIL:
        return {
          ...state,
          updateUserInfoSuccess: false,
          updateUserInfoError: action.payload, // Almacena el error si la actualización falla
        };
                      
      case LOGOUT:
        return {
          ...state,
          user: null, // Establece 'user' en null al cerrar sesión
           };
      case CREATE_RATING:
        return {
          ...state,
          ratings: [ action.payload,...state.ratings],            
             };
      case GET_RATINGS:
          console.log("Recibida la acción GET_RATINGS con payload:", action.payload);
          return {
          ...state,
          ratings: action.payload,
           };
      case SET_SHOW_RESULTS:
           return { ...state, showResults: action.showResults };

      case ADD_TO_CART:
         return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      case REMOVE_FROM_CART:
          return {
            ...state, cartItems: state.cartItems.filter(product => product.sku !== action.payload)
          };
   
            default:
              return state;
          }
        };
        
        
export default rootReducer;
