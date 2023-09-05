import axios from "axios";

export const ERROR = "ERROR";
export const GET_PODUCT_SUCCESS = 'GET_PODUCT_SUCCESS';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'; // Nueva acción para filtrar productos
export const SORT_PRODUCTS_BY_PRICE = 'SORT_PRODUCTS_BY_PRICE';
export const CREATE_PRODUCT = 'CREATE_PRODUCT'

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

// Nueva acción para filtrar productos

export const filterProducts = (searchTerm, allProducts) => {
  if (searchTerm === '') {
    // Si el término de búsqueda está vacío, muestra todos los productos.
    return {
      type: 'FILTER_PRODUCTS',
      payload: allProducts,
    };
  } else {
    // Filtra los productos en función del término de búsqueda.
    const filteredProducts = allProducts.filter(product =>
      product.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      type: 'FILTER_PRODUCTS',
      payload: filteredProducts,
    };
  }
};

export const sortProductsByPrice = (orderBy) => {
  return {
    type: SORT_PRODUCTS_BY_PRICE,
    payload: orderBy,
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