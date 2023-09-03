import axios from "axios";

export const ERROR = "ERROR";
export const GET_PODUCT_SUCCESS = 'GET_PODUCT_SUCCESS';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';

export const getAllProducts = () => {
  return async function(dispatch) {
    let errorMessage = '';

    try {
      const response = await axios.get('http://localhost:3001/products');
      dispatch({type: GET_PODUCT_SUCCESS, payload: response.data});
    } catch (error) {
      errorMessage = 'Producto no encontrado';
      dispatch({type: ERROR, payload: errorMessage})
    }
    return errorMessage;
    }
  };

  export const getProductDetail = (sku) => {
    return async function (dispatch) {
      let errorMessage = '';
  
      try {
        const response = await axios.get(`http://localhost:3001/products/sku/${sku}`);
        dispatch({type: GET_PRODUCT_DETAIL, payload: response.data});
      } catch (error) {
        errorMessage = 'Producto no encontrado';
        dispatch({type: ERROR, payload: errorMessage});
      }
      return errorMessage;
    };
  };