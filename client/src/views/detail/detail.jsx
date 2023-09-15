import React from "react";
import '../../components/css/index.css';
import { Link } from "react-router-dom";
import { useGetProductDetailHandler } from "../../components/handlers/handlersdetail";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";
import AddRating from "../../components/rating/AddRating";
import ProductRating from "../../components/rating/ProductRating";
import ProductComment from "../../components/rating/ProductComment";


const Detail = () => {
  const productDetail = useGetProductDetailHandler();
  const dispatch = useDispatch();
  const product_id = productDetail ? productDetail.sku : null; // Asegúrate de tener un SKU válido

  

  if (!productDetail) {
    return <p>No se encontró información para el producto seleccionado.</p>;
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container-detail" style={{ marginTop: "140px" }}>
      <div >
      <h1 className="text-center" style={{ marginTop: "20px" }} >Detalle del producto</h1>
      <div className="row">
        <div className="col-md-8 mx-auto" style={{ maxWidth: "600px", marginTop: "10px" }}>
          <div className="card custom-shadow">
            <div className="card-body">
              <p className="card-text">N/P: {productDetail.number_part}</p>
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
              <Button
                variant="dark"
                onClick={() => handleAddToCart(productDetail)}
              >
                Agregar al carrito
              </Button>
        
              <AddRating product_id={product_id} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={productDetail.image}
            alt={productDetail.titulo}
            className="img-detail"
          />

        <div>
         <ProductComment sku={product_id} className="col-md-6" />
      </div> 

        </div>
   
      </div>
      

      <div className="text-center mt-4">
        <Button variant="dark" as={Link} to="/Home">
          Volver a inicio
        </Button>
      </div>
    </div>
    </div>
  );
};

export default Detail;

