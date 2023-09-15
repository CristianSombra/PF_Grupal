import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/actions/index";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (sku) => {
    dispatch(removeFromCart(sku));
  };

  const handleIncreaseQuantity = (sku) => {
    dispatch(increaseQuantity(sku));
  };

  const handleDecreaseQuantity = (sku) => {
    // Find the item in the cartItems array
    const item = cartItems.find((item) => item.sku === sku);
    
    // Make sure the item exists and the quantity is greater than 1
    if (item && item.quantity > 1) {
      dispatch(decreaseQuantity(sku));
    }
  };
  const calculateTotalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  
  
  return (
    <div style={{ margin: "150px", border: "gray solid 1px", borderRadius: "10px", padding: "20px", boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)" }}>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="card">
          <div className="card-body">
            {cartItems.map((item) => (
              <div key={item.sku} className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <img src={item.image} alt={item.name} />
                  <p className="card-text">Precio: ${item.price}</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-secondary me-2" onClick={() => handleDecreaseQuantity(item.sku)}>-</button>
                    <p className="me-2">{item.quantity}</p>
                    <button className="btn btn-secondary me-2" onClick={() => handleIncreaseQuantity(item.sku)}>+</button>
                    <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.sku)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="mt-3">Total: ${calculateTotalPrice}</p>
      <Button className="mt-3" variant="dark" as={Link} to="/buyPage">
        Terminar compra
      </Button>
    </div>
  );
};

export default Cart;