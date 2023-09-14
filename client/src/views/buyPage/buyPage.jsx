import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import "../../components/css/index.css";

const BuyPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => Number(total) + Number(item.price), 0);
  };
  
  const referenceUUID = uuidv4();

  return (
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
          marginBottom: "50px",
        }}
      >
        <div>
          <h2 className="text-center" style={{ fontWeight: 700 }}>Resumen de Compra</h2>
          <div>
            <div className="card-body">
              {cartItems.map((item) => {
                const product = products.find((p) => p.sku === item.sku);
                return (
                  <Card key={item.sku} className="mb-3">
                    <Row className="no-gutters">
                      <Col md={4}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="img-detail img-fluid"
                        />
                      </Col>
                      <Col md={8}>
                        <div className="card-body">
                          <h5 className="card-title">Nombre: {product.titulo}</h5>
                          <p className="card-text">Precio: ${item.price}</p>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                );
              })}
            </div>
          </div>
          <h3 className="d-flex justify-content-end mt-4" style={{ margin: "30px" }}>Total: ${calculateTotal()}</h3>
          <form action="https://checkout.wompi.co/p/" method="GET">
            <input type="hidden" name="public-key" value="pub_test_GZlevgVBlUIA4Aq8jcYjNPJBJEnbitYV" />
            <input type="hidden" name="currency" value="COP" />
            <input type="hidden" name="amount-in-cents" value={calculateTotal() * 100} />
            <input type="hidden" name="reference" value={referenceUUID} />
            <input type="hidden" name="redirect-url" value="http://localhost:3000/order/result" />

            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary" type="submit" className="waybox-button" style={{ width: "30%" }}>Pagar</Button>
            </div>
          </form>
        </div>
      </Col>
    </Row>
        <div className="text-center m-4">
          <Button variant="dark" as={Link} to="/cart">
            Volver al carrito
          </Button>
        </div>
    </div>
  )
};

export default BuyPage;
