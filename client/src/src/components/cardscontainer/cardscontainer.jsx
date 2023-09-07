import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions/index";
import styles from "./cardscontainer.module.css";
import Card from "../card/card";

const CardsContainer = () => {
  const allProducts = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={styles.cardContext}>
      {allProducts.length > 0 ? (
        allProducts.map((product) => (
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
