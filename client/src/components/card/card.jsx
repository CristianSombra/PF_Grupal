import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";


const Card = (props) => {
  const { sku } = props;

  return (
    <Link to={`/detail/${sku}`} className={style.cardLink}>
    <div className={style.card}>
      <div className={style.flagImageContainer}>
        <img src={props.image} alt={props.titulo} className={style.flagImage} />
      </div>
      <div className={style.textContainer}>
            <p>Nombre: {props.name}</p>
            <p>Precio: {props.price}</p>
      </div>
    </div>
    </Link>
  );
};

export default Card;
