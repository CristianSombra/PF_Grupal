import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BuyPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div style={{ margin: "100px" }}>
      <h2>Resumen de Compra</h2>
      <div className="card">
        <div className="card-body">
          {cartItems.map((item) => {
            const product = products.find((p) => p.sku === item.sku);
            return (
              <div key={item.sku} className="card">
                <div className="card-body">
                  <h5 className="card-title">Nombre: {product.titulo}</h5>
                  <p className="card-text">Precio: ${item.price}</p>
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p>Total: ${calculateTotal()}</p>
      <Button variant="dark" as={Link} to="/checkout">
        Finalizar Compra
      </Button>
    </div>
  );
};

export default BuyPage;
