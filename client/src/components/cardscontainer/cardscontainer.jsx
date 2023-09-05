import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions/index";
import styles from "./cardscontainer.module.css"
import Card from "../card/card";

const CardsContainer = () => {
  const products = useSelector((state) => state.products);
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={styles.cardContext}>
      {products.length > 0 ? (
        products.map((product) => (
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
