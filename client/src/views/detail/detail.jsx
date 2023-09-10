import React from "react";
import './detail.css';
import { Link } from "react-router-dom";
import { useGetProductDetailHandler } from "../../components/handlers/handlersdetail";
import Button from "react-bootstrap/esm/Button";


const Detail = () => {
  const productDetail = useGetProductDetailHandler();

  if (!productDetail) {
    return <p>No se encontró información para el producto seleccionado.</p>;
  }

  return (
    <div className="container">
      <h1 className="mt-5">Detalle del producto</h1>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card custom-shadow">
            <div className="card-body">
              <h5 className="card-title">Nombre: {productDetail.titulo}</h5>
              <p className="card-text">Precio: {productDetail.price}</p>
              <p className="card-text">En stock: {productDetail.disponibility}</p>
              <p className="card-text">Detalle:</p>
              <ul>
                <li>Ram: {productDetail.detail.ram}</li>
                <li>Pantalla: {productDetail.detail.pantalla}</li>
                <li>Procesador: {productDetail.detail.procesador}</li>
                <li>Almacenamiento: {productDetail.detail.almacenamiento}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={productDetail.image}
            alt={productDetail.titulo}
            className="img-custom-size"
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <Button variant="dark" as={Link} to="/Home">
              Volver a inicio
            </Button>
      </div>
    </div>
  );
};

export default Detail;
