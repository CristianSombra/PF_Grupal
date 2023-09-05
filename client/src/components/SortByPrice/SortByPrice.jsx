import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortProductsByPrice } from '../../redux/actions/index';

const SortByPrice = () => {
  const [orderBy, setOrderBy] = useState('asc');
  const dispatch = useDispatch();

  const handleSortChange = () => {
    const newOrderBy = orderBy === 'asc' ? 'desc' : 'asc';
    setOrderBy(newOrderBy);

    // Dispara la acción para ordenar los productos
    dispatch(sortProductsByPrice(newOrderBy));
  };

  return (
    <div>
      <label>Ordenar por precio:</label>
      <button onClick={handleSortChange}>
        {orderBy === 'asc' ? 'Precio ascendente' : 'Precio descendente'}
      </button>
    </div>
  );
};

export default SortByPrice;
