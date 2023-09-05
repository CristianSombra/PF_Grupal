import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions/index";
import styles from "./cardscontainer.module.css";
import Card from "../card/card";

const CardsContainer = () => {
  const allProducts = useSelector((state) => state.products); // Estado para todos los productos
  const filteredProducts = useSelector((state) => state.filteredProducts); // Estado para productos filtrados
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : allProducts;

  return (
    <div className={styles.cardContext}>
      {productsToDisplay.length > 0 ? (
        productsToDisplay.map((product) => (
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
