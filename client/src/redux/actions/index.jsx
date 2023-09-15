import axios from "axios";
export const UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS";
export const ERROR = "ERROR";
export const GET_PODUCT_SUCCESS = 'GET_PODUCT_SUCCESS';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const SORT_PRODUCTS_BY_PRICE = 'SORT_PRODUCTS_BY_PRICE';
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const RESET_SELECTED_BRAND_CATEGORY = "RESET_SELECTED_BRAND_CATEGORY"
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';
export const LOGOUT  = 'LOGOUT ';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAIL = 'UPDATE_USER_INFO_FAIL';
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const increaseQuantity = (sku) => {
  return {
    type: INCREASE_QUANTITY,
    payload: sku,
  };
};

export const decreaseQuantity = (sku) => {
  return {
    type: "DECREASE_QUANTITY",
    payload: sku,
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: { ...product, quantity: 1 }, // Inicializa la cantidad en 1
  };
};

export const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};

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


//login

export const login = (formData) => async (dispatch) => {
  try {
   
    const res = await axios.post('http://localhost:3001/user/login', formData);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    console.log(res);
    
  } catch (error) {
    console.log(error);
    // Disparar una acción de error en caso de fallo
    dispatch({ type: LOGIN_FAIL, payload: 'Error en el inicio de sesión' });
  }
};

export const createUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:3001/user', formData);
    // Disparar una acción de éxito con los datos del nuevo usuario
    dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    // Disparar una acción de error en caso de fallo
    dispatch({ type: CREATE_USER_FAIL, payload: error.response.data });
  }
};

  export const loadUserById = (userId) => async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/user/id/${userId}`);
      dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.message });
    };
  };

 export const updateUserInfo = ( newPassword) => async (dispatch, getState) => {
  const userId = getState().user.id;
  
  // Realiza una solicitud para actualizar la información del usuario en el servidor
  try {
    const res = await axios.put(`http://localhost:3001/user/id/${userId}`, {
      user_password: newPassword,
    });

    // Si la actualización fue exitosa, puedes despachar una acción de éxito o manejarla según tus necesidades
    dispatch({ type: UPDATE_USER_INFO_SUCCESS, payload: res.data });

    // Muestra un mensaje de éxito o redirige al usuario a su cuenta
    alert('Datos actualizados correctamente');
    // Puedes redirigir al usuario a su cuenta aquí, por ejemplo:
    // history.push('/mi-cuenta');
  } catch (error) {
    // Maneja los errores y dispatch una acción de error si es necesario
    dispatch({ type: UPDATE_USER_INFO_FAIL, payload: error.response.data });
  };
};

    export const logout = () => ({
      type: LOGOUT,
    });

