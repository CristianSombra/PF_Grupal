import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortProductsByPrice } from '../../redux/actions/index';

const SortByPriceHandler = () => {
    const dispatch = useDispatch();
    const orderByPrice = useSelector((state) => state.orderByPrice);
  
    const handleSortChange = () => {
      const newOrderByPrice = orderByPrice === 'asc' ? 'desc' : 'asc';
      
      // Disparar la acción para actualizar el estado global con la nueva dirección de orden por precio
      dispatch(sortProductsByPrice(newOrderByPrice === orderByPrice ? null : newOrderByPrice));
    };
  
    return (
      <div>
        <label>Ordenar por precio:</label>
        <button onClick={handleSortChange}>
          {orderByPrice === 'asc' ? 'Mayor precio' : 'Menor precio'}
        </button>
      </div>
    );
  };
  
  export default SortByPriceHandler;