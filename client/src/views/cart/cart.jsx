import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/index";
import { Button, Card, Col, Row } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="container-cart">
      <div>
      <Row className="mt-3">
        <Col
          md={8}
          className="mx-auto"
          style={{
            margin: "150px",
            border: "gray solid 1px",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)",
            marginBottom: "20px",
          }}
        >
          <h1 className="mt-5 mx-auto text-center" style={{fontWeight:700}} >Carrito de Compras</h1>
          {cartItems.length === 0 ? (
            <p className="text-center">El carrito está vacío.</p>
          ) : (
            <div className="card-body">
              {cartItems.map((item) => (
                <Card key={item.id} className="mb-3">
                  <Row className="no-gutters">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.titulo}
                        className="img-detail img-fluid"
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <h5 className="card-title">Nombre: {item.titulo}</h5>
                        <p className="card-text">Precio: ${item.price}</p>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveFromCart(item.sku)}
                        >
                          Eliminar
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="d-flex justify-content-end mt-3">
            <Button variant="success" as={Link} to="/buyPage">
              Terminar compra
            </Button>
            </div>
          )}
        </Col>
      </Row>
      {cartItems.length > 0 && (
        <div className="text-center m-4">
          <Button variant="dark" as={Link} to="/Home">
            Volver a inicio
          </Button>
        </div>
      )}
      <Button className="mt-3" variant="dark" as={Link} to="/buyPage">
        Terminar compra
      </Button>
    </div>
  );
};
export default Cart;