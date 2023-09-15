import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const BuyPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const referenceUUID = uuidv4();

  return (
    <div
      style={{
        margin: "150px",
        border: "gray solid 1px",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)",
      }}
    >
      <h2 style={{ fontWeight: 700 }}>Resumen de Compra</h2>
      <div>
        <div className="card-body">
          {cartItems.map((item) => {
            const product = products.find((p) => p.sku === item.sku);
            return (
              <div
                key={item.sku}
                className="card"
                style={{
                  margin: "15px",
                  border: "gray solid 1px",
                  borderRadius: "10px",
                  padding: "20px",
                  boxShadow: "0px 5px 5px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">Nombre: {product.titulo}</h5>
                  <p className="card-text">Precio: ${item.price}</p>
                  <p className="card-text">Cantidad: {item.quantity}</p>{" "}
                  {/* Utiliza item.quantity para mostrar la cantidad */}
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <h3 style={{ margin: "30px" }}>Total: ${calculateTotal()}</h3>
      <form action="https://checkout.wompi.co/p/" method="GET">
        <input
          type="hidden"
          name="public-key"
          value="pub_test_GZlevgVBlUIA4Aq8jcYjNPJBJEnbitYV"
        />
        <input type="hidden" name="currency" value="COP" />
        <input
          type="hidden"
          name="amount-in-cents"
          value={calculateTotal() * 100}
        />
        <input type="hidden" name="reference" value={referenceUUID} />
        <input
          type="hidden"
          name="redirect-url"
          value="http://localhost:3000/order/result"
        />
        <div className="text-center mt-4">
          <Button
            variant="primary"
            type="submit"
            class="waybox-button"
            style={{ width: "30%" }}
          >
            Pagar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BuyPage;
