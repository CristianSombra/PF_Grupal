import React from "react";
import { Link } from "react-router-dom";
import { useGetProductDetailHandler } from "../../components/handlers/handlersdetail";
import Button from "react-bootstrap/esm/Button";
import "../../components/css/index.css";


const Detail = () => {
  const productDetail = useGetProductDetailHandler();

  if (!productDetail) {
    return <p>No se encontró información para el producto seleccionado.</p>;
  }

  return (
    <div className="container">
      <div className="row">
          <h1>Detalle del producto</h1>
          <div className="col-md-4 custom-shadow">
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
        <img
          src={productDetail.image}
          alt={productDetail.titulo}
          class="col-sm-6"
        />
      </div>

      <div>
        <div>
        <Button variant="dark" as={Link} to="/Home">Volver a Inicio</Button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
