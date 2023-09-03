import React from "react";
import { Link } from "react-router-dom";
import { useGetProductDetailHandler } from "../../components/handlers/handlersdetail";
import styles from "./detail.module.css";

const Detail = () => {
  const productDetail = useGetProductDetailHandler();

  if (!productDetail) {
    return <p>No se encontró información para el producto seleccionado.</p>;
  }

  return (
    <div>
      <div className={styles.detailContainer}>
        <div className={styles.card}>
          <h1>Detalle del producto</h1>
          <div className={styles.productInfo}>
            <p>Nombre: {productDetail.titulo}</p>
            <p>Precio: {productDetail.price}</p>
            <p>En stock: {productDetail.disponibility}</p>
            <p>Detalle:</p>
            <ul>
              <li>Ram: {productDetail.detail.ram}</li>
              <li>Pantalla: {productDetail.detail.pantalla}</li>
              <li>Procesador: {productDetail.detail.procesador}</li>
              <li>Almacenamiento: {productDetail.detail.almacenamiento}</li>
            </ul>
          </div>
        </div>
        <img
          src={productDetail.image}
          alt={productDetail.titulo}
          className={styles.flagImage}
        />
      </div>

      <div className={styles.goHome}>
        <Link to="/Home" className={styles.linkButton} >Volver a Inicio</Link>
      </div>
    </div>
  );
};

export default Detail;
