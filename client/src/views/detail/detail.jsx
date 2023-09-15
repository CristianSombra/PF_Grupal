import React from "react";
import "../../components/css/index.css";
import { Link } from "react-router-dom";
import { useGetProductDetailHandler } from "../../components/handlers/handlersdetail";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";

const Detail = () => {
  const productDetail = useGetProductDetailHandler();
  const dispatch = useDispatch();

  if (!productDetail) {
    return <p>No se encontró información para el producto seleccionado.</p>;
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container-detail">
      <h1 className="mt-5 mx-auto text-center">Detalle del producto</h1>
      <div className="row mt-3">
        <div className="col-md-8 mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card custom-shadow">
            <div className="card-body">
              <p className="card-text">N/P: {productDetail.number_part}</p>
              <h5 className="card-title">Nombre: {productDetail.titulo}</h5>
              <p className="card-text">Precio: {productDetail.price}</p>
              <p className="card-text">
                En stock: {productDetail.disponibility}
              </p>
              <p className="card-text">Detalle:</p>
              <ul>
                <li>Ram: {productDetail.detail.ram}</li>
                <li>Pantalla: {productDetail.detail.pantalla}</li>
                <li>Procesador: {productDetail.detail.procesador}</li>
                <li>Almacenamiento: {productDetail.detail.almacenamiento}</li>
              </ul>

              <div className="mt-2 text-center d-flex justify-content-center">
                <Button
                  variant="success"
                  className="mt-2 btn me-3"
                  onClick={() => handleAddToCart(productDetail)}
                >
                  <i className="bi bi-cart-plus"></i></Button>
                <Button
                  variant="danger"
                  className="mt-2 btn"
                  //logica para agregar la tarjeta a favoritos
                >
                  <i className="bi bi-heart"></i></Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={productDetail.image}
            alt={productDetail.titulo}
            className="img-detail"
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
