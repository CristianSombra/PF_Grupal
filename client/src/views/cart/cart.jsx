import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/index";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = () => {

  const cartItems = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products); 

  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div style={{ margin: "100px" }}>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map((item) => {
            const product = products.find((p) => p.sku === item.sku); // Buscar el producto correspondiente
            if (!product) {
              // Manejar el caso en el que el producto no se encuentra
              return null;
            }
            console.log('Product:', product); // Agrega este console.log
            console.log('Titulo:', product.titulo); // Agrega este console.log
            console.log('Image:', product.image); // Agrega este console.log
            return (
              <li key={item.id}>
                <h5 className="card-title">Nombre: {product.titulo}</h5>
                <img src={product.image} alt={product.title} />
                <p className="card-text">Precio: ${item.price}</p>
                <button onClick={() => handleRemoveFromCart(item.sku)}>
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <Button variant="dark" as={Link} to="/buyPage">
        Terminar compra
      </Button>
    </div>
  );
        }

export default Cart;