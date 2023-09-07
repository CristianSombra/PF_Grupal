import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortProductsByPrice } from '../../redux/actions/index';
import styles from "../filter/filter.module.css";

const SortByPriceHandler = () => {
  const dispatch = useDispatch();
  const orderByPrice = useSelector((state) => state.orderByPrice);

  const handleSortChange = (event) => {
    const newOrderByPrice = event.target.value;
    
    // Disparar la acción para actualizar el estado global con la nueva dirección de orden por precio
    dispatch(sortProductsByPrice(newOrderByPrice === orderByPrice ? null : newOrderByPrice));
  };

  return (
    <div>
      <label>Ordenar por precio:</label>
      <select
        className={styles.select}
        value={orderByPrice || ''}
        onChange={handleSortChange}
      >
        <option value="">Sin selección</option>
        <option value="asc">Menor precio</option>
        <option value="desc">Mayor precio</option>
      </select>
    </div>
  );
};

export default SortByPriceHandler;
