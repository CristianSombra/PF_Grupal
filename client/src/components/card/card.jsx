import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";


const Card = (props) => {
  const { sku } = props;

  return (
    <Link to={`/detail/${sku}`} className={styles.cardLink}>
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={props.image} alt={props.titulo} className={styles.flagImage} />
      </div>
      <div className={styles.textContainer}>
            <p>Nombre: {props.name}</p>
            <p>Precio: {props.price}</p>
      </div>
    </div>
    </Link>
  );
};

export default Card;
