import axios from "axios";
export const UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS";
export const ERROR = "ERROR";
export const GET_PODUCT_SUCCESS = 'GET_PODUCT_SUCCESS';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const SORT_PRODUCTS_BY_PRICE = 'SORT_PRODUCTS_BY_PRICE';
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const RESET_SELECTED_BRAND_CATEGORY = "RESET_SELECTED_BRAND_CATEGORY"

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
  };
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

  
  
  export const createProduct = (payload) => {
    return async (dispatch) => {
      try {
        await axios.post('http://localhost:3001/products', payload)
        dispatch({type: CREATE_PRODUCT})
      } catch (error) {
        const errorMessage = 'Error al crear el producto'
        dispatch({type: ERROR, payload: errorMessage})
      }
    }
  }



  export const sortProductsByPrice = (orderBy) => {
    return {
      type: SORT_PRODUCTS_BY_PRICE,
      payload: orderBy,
    };
  };
  

  export const filterByBrand = (brandId) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/products/brands/${brandId}`);
        dispatch({ type: GET_PODUCT_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({ type: ERROR, payload: 'Error al filtrar por marca' });
      }
    };
  };
  
  export const filterByCategory = (categoryId) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/products/categories/${categoryId}`);
        dispatch({ type: GET_PODUCT_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({ type: ERROR, payload: 'Error al filtrar por categoría' });
      }
    };
  };
  
  export const getCategories = () =>{
    return async function(dispatch){
      try{
        const response = await axios.get(`http://localhost:3001/products/categories/`);
        console.log(response);
        return response.data
      } catch (error){
        console.log(error);
      }
    }
  }

  export const getBrands = () =>{
    return async function(dispatch){
      try{
        const response = await axios.get(`http://localhost:3001/products/brands/`);
        console.log(response);
        return response.data
      } catch (error){
        console.log(error);
      }
    }
  }
  export const getProductFilter = (id_brand, id_category) =>{
    return async function(dispatch){
      try{
        const response = await axios.post(`http://localhost:3001/products/filter/`, {id_brand:id_brand, id_category:id_category});
        console.log(response);

        dispatch({type: GET_PODUCT_SUCCESS, payload: response.data});
        return ('si');
      } catch (error){
        dispatch({ type: ERROR, payload: 'Error al filtrar' });
      }
    }
  }
  export const resetFilters = () => {
    return async function (dispatch) {
      dispatch(getAllProducts());
      dispatch({
        type: UPDATE_SEARCH_RESULTS,
        payload: [], // Reinicia los resultados de búsqueda a un array vacío
      });
      dispatch({
        type: SORT_PRODUCTS_BY_PRICE,
        payload: null, // Reinicia el ordenamiento de productos a null
      });
      dispatch({
        type: RESET_SELECTED_BRAND_CATEGORY, // Define un nuevo tipo de acción para reiniciar las selecciones de marca y categoría
      });
    };
  };
  

  export const updateSearchResults = (results) => {
    return {
      type: UPDATE_SEARCH_RESULTS,
      payload: results,
    };
  };
