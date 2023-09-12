import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import '../../components/css/index.css';
import { Link } from "react-router-dom";
import { useGetProductDetailHandler } from "../../components/handlers/handlersdetail";
import Button from "react-bootstrap/esm/Button";
import AddRating from "../../components/rating/AddRating";
import ProductRating from "../../components/rating/ProductRating";
import { getRatings } from "../../redux/actions"; // Importa la acción para obtener calificaciones

const Detail = () => {
  const dispatch = useDispatch();
  const productDetail = useGetProductDetailHandler();
  const product_id = productDetail ? productDetail.sku : null; // Asegúrate de tener un SKU válido

  // Dispara la acción para obtener calificaciones cuando el componente se monta
  useEffect(() => {
    if (product_id) {
      dispatch(getRatings());
    }
  }, [dispatch, product_id]);

  if (!productDetail) {
    return <p>No se encontró información para el producto seleccionado.</p>;
  }

  return (
    <div className="container-detail">
      <h1 className="mt-5 mx-auto text-center">Detalle del producto</h1>
      <div className="row mt-3">
        <div className="col-md-8 mx-auto" style={{ maxWidth: "600px" }}>
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
                <li>Almacenamiento: {product_id}</li>
              </ul>
              <ProductRating sku={product_id} />
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
      <div>
        <AddRating product_id={product_id} />
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

