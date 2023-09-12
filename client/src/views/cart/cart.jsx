import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../redux/actions/index";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div  style={{ margin: "150px", border: "gray solid 1px", borderRadius: "10px", padding:"20px",  boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)"}}>      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="card">
          <div className="card-body">
            {cartItems.map((item) => (

              <div key={item.id} className="card">
                <div className="card-body">
                <h5 className="card-title">Nombre: {item.titulo}</h5>
                  <img src={item.image} alt={item.title} />
                  <p className="card-text">Precio: ${item.price}</p>
                  <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.sku)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Button className="mt-3" variant="dark" as={Link} to="/buyPage">
        Terminar compra
      </Button>
    </div>
  );

};

export default Cart;
