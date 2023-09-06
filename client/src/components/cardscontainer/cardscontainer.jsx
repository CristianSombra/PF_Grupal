// CardsContainer.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./cardscontainer.module.css";
import Card from "../card/card";
import { sortProductsByPrice } from '../sortingUtils/sortingUtils'; // Importa la función de ordenación por precio
import { getAllProducts } from "../../redux/actions/index";

const CardsContainer = () => {
  const allProducts = useSelector((state) => state.products);
  const orderByPrice = useSelector((state) => state.orderByPrice);
  let sortedProducts = [...allProducts]; // Clona todos los productos correctamente


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);


  // Aplica la lógica de ordenamiento solo si uno de los campos de ordenamiento está configurado
  if (orderByPrice !==null) {
    sortedProducts = orderByPrice === 'asc'
      ? sortProductsByPrice(sortedProducts, 'asc')
      : sortProductsByPrice(sortedProducts, 'desc');
  } 

  return (
    <div className={styles.cardContext}>
      {sortedProducts.length > 0 ? (
        sortedProducts.map((product) => (
          <Card
            key={product.sku}
            sku={product.sku}
            name={product.titulo}
            price={product.price}
            image={product.image}
          />
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default CardsContainer;
