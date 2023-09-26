import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "../../components/css/index.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
// import SuccessPurchase from "../Payment/SuccesPayment";


const apiUrl = "TEST-77c820a7-513b-44a4-8b2d-01ea41494588";
const POST_NEW_ORDER = "http://localhost:3001/order/create";
const POST_PAYMENT = "http://localhost:3001/payments/generate";

initMercadoPago(apiUrl);

const BuyPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products);

  const calculateTotal = () => {
    let total = 0;

    // Recorre los elementos en el carrito y suma el precio de cada producto
    for (const item of cartItems) {
      const product = products.find((p) => p.sku === item.sku);
      if (product) {
        total += item.quantity * product.price;
      }
    }
    return total;
  };

  const userId = localStorage.getItem('id');
  const referenceUUID = uuidv4();
  const handlePayment = async () => {
    const total = calculateTotal(); // Obtener el total de los productos
    const response = await axios.post(POST_NEW_ORDER, {
      userId: userId,
      products: cartItems,
      totalprice: total, // Pasar el total calculado
    });
    console.log(response );
  localStorage.setItem('orderId', response.data.order.id)
    // console.log(response.data.init_point);
  
    window.location.href = response.data.init_point;
    
  };
  

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
            <h2 className="text-center" style={{ fontWeight: 700 }}>
              Resumen de Compra
            </h2>
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
                            <h5 className="card-title">
                              Nombre: {product.titulo}
                            </h5>
                            <p className="card-text">
                              Precio: ${product.price}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
              </div>
            </div>
            <h3
              className="d-flex justify-content-end mt-4"
              style={{ margin: "30px" }}
            >
              Total: ${calculateTotal()}
            </h3>

            <Button
              variant="primary"
              onClick={handlePayment}
              style={{ width: "30%" }}
              className="float-end"
            >                            
              Pagar
            </Button>
          </div>
        </Col>
      </Row>
      <div className="text-center m-4">
        <Button variant="dark" as={Link} to="/cart">
          Volver al carrito
        </Button>
      </div>
{/* <SuccessPurchase purchaseId={referenceUUID} purchaseDetails={cartItems} /> */}
    </div>
  );
};

export default BuyPage;