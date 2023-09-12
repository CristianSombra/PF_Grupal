import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const BuyPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => Number(total) + Number(item.price), 0);
  };
  
  const referenceUUID = uuidv4();

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
      <form action="https://checkout.wompi.co/p/" method="GET">
            <input type="hidden" name="public-key" value="pub_test_GZlevgVBlUIA4Aq8jcYjNPJBJEnbitYV" />
            <input type="hidden" name="currency" value="COP" />
            <input type="hidden" name="amount-in-cents" value={calculateTotal() * 100} />
            <input type="hidden" name="reference" value={referenceUUID} />
            <input type="hidden" name="redirect-url" value="http://localhost:3000/order/result" />
            <button type="submit" class="waybox-button">Pagar</button>
      </form>
    </div>
  )
};

export default BuyPage;