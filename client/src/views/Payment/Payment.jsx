
  
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useDispatch, useSelector } from "react-redux";
  import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
  import { useNavigate } from "react-router-dom";
  import { deleteCart, getDetailOrdersIDArray, emptyDetailOrdersId } from "../../redux/actions";
  import NavBar2 from "../../components/NavBar2";
  import { SiMercadopago, SiCashapp } from "react-icons/si";
  
  
  const apiUrl = "TEST-77c820a7-513b-44a4-8b2d-01ea41494588";
  const POST_NEW_ORDER = "http://localhost:3001/payments/generate";
  const POST_PAYMENT = "http://localhost:3001/orders/create";
  
  initMercadoPago(apiUrl);
  
  export default function Payment(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const detailOrderIdsArray = useSelector((state) => state.detailOrdersUsersID);
    const detailCarrito = useSelector((state) => state.cartItems);
    const users = useSelector((state) => state.users);
    const idUser = useSelector((state) => state.idUser);
  
    const totalPrice = detailCarrito.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  
    const [finalOrder, setFinalOrder] = useState(null);
    const [preferenceId, setPreferenceId] = useState(null);
    const [activateButton, setActivateButton] = useState(false);
  
    const handleOrder = async () => {
      const orderArray = detailOrderIdsArray[0];
      const userId = idUser;
      const orderID = await axios.post(POST_NEW_ORDER, {
        detailIds: orderArray,
        userId: userId,
      });
  
      setFinalOrder(orderID.data.order);
      setActivateButton(true);
    };
  
    const handleClick = async () => {
      dispatch(emptyDetailOrdersId());
    };
  
    const handlePayment = async () => {
      const response = await axios.post(POST_PAYMENT, {
        orderId: finalOrder.id,
        cart: detailCarrito,
      });
  
      setPreferenceId(response.data.init_point);
      window.location.href = response.data.init_point;
      dispatch(deleteCart());
    };
  
    return (
      <div>
        <div className="container-fluid">
          <NavBar2 />
          <div
            className="bg-image"
            style={{
              backgroundImage: "url('/BG3.jpg')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100vw",
              height: "100vh",
              paddingTop: "50px",
            }}
          >
            <div className="row">
              <div className="col-md-6">
                <div
                  className="bg-gray w-70 h-650 p-4 rounded-left"
                  style={{ marginLeft: "24%" }}
                >
                  <div>
                    <p>Please check your order:</p>
                    <div className="overflow-auto" style={{ maxHeight: "500px" }}>
                      {detailCarrito.map((product, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center bg-gray-300 m-2"
                        >
                          <div className="px-2">
                            <CheckIcon />
                          </div>
                          <div>
                            <p>
                              Nombre: {product.name}
                              <br />
                              Precio: ${product.price}
                              <br />
                              Cantidad: {product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center mt-10">
                  <img
                    src="/LOGO PNG.png"
                    alt="Computers"
                    className="ml-4 w-200"
                  />
                  <br />
                  <br />
                  <h2>Total: ${totalPrice}</h2>
                  <br />
                  <br />
                  <div className="ml-23">
                    <button
                      onClick={handleOrder}
                      className="btn btn-primary w-120"
                    >
                      Place Order
                    </button>
                    <br />
                    <br />
                    {activateButton && (
                      <button
                        onClick={handlePayment}
                        className="btn btn-primary w-120"
                      >
                        Payment
                        <SiMercadopago size="2.5em" />
                      </button>
                    )}
                    <br />
                    <br />
                    <a href="/cart">
                      <button
                        onClick={handleClick}
                        className="btn btn-primary w-120"
                        style={{ backgroundColor: "blue.900", color: "white" }}
                      >
                        Go Back
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  