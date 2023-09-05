import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions/index";
import styles from "./cardscontainer.module.css";
import Card from "../card/card";

const CardsContainer = () => {
  const allProducts = useSelector((state) => state.products);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const orderByPrice = useSelector((state) => state.orderByPrice); // Nuevo estado para el orden

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Función para ordenar los productos según el estado de orden
  const sortProducts = (products) => {
    return products.sort((a, b) => {
      if (orderByPrice === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : allProducts;

  return (
    <div className={styles.cardContext}>
      <div className={styles.sortContainer}>
        {/* ... Renderiza el componente SortByPrice aquí ... */}
      </div>
      {productsToDisplay.length > 0 ? (
        // Ordena los productos antes de mapearlos
        sortProducts(productsToDisplay).map((product) => (
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
