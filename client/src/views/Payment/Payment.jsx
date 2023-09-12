
  
  import { SiMercadopago, SiCashapp } from "react-icons/si";
  import NavBar2 from "../../components/navbar/navbar";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
  import { useNavigate } from "react-router-dom";
 /*  import { deleteCart, getDetailOrdersIDArray, emptyDetailOrdersId } from "../../redux/actions"; */
  import { useDispatch } from "react-redux";
  const apiUrl = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY;
  const POST_NEW_ORDER = import.meta.env.VITE_POST_NEW_ORDER;
  const POST_PAYMENT = import.meta.env.VITE_POST_PAYMENT;
  
  initMercadoPago(apiUrl);
  
  //global state
  
  export default function Payment (props) {
  
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const detailOrderIdsArray = useSelector(state => state.detailOrdersUsersID);
      const detailCarrito = useSelector(state => state.cartItems);
      const users = useSelector(state => state.users)
      const idUser = useSelector(state => state.idUser)
  
     
  
      const totalPrice = detailCarrito.reduce((total, item) => total + item.price * item.quantity, 0);
      console.log(detailOrderIdsArray);
  
    //sacar detailIds y el userId
    const [finalOrder, setFinalOrder] = useState(null);
    const [preferenceId, setPreferenceId] = useState(null);
    const [activateButton, setActivateButton] = useState(false);
  
    // console.log(detailOrderIdsArray[0].userId, "hola")
  
    const handleOrder = async () => {
      
      //esto se podria hacer con un useEffect
      const orderArray = detailOrderIdsArray[0];
      const userId = idUser; // ojo recordar arreglar con lo de user de kervys
      const orderID = await axios.post(
        POST_NEW_ORDER,
        { detailIds: orderArray, userId: userId }
      );
      console.log(orderArray)
  
      setFinalOrder(orderID.data.order);
      setActivateButton(true);
  
  
    };
  
    const handleClick = async () => {
      dispatch(emptyDetailOrdersId())
    };
  
    const handlePayment = async () => {
      //aqui se mandaria la data a mercado pago
  
      //IMPORTANTE, una vez dado el OK de la orden, antes de mandar se borra el array de ids y carrito para que no haya duplicados, zaqui se borra el carrito
      console.log(finalOrder);
      const response = await axios.post(
        POST_PAYMENT,
        { orderId: finalOrder.id, cart: detailCarrito }
      );
  
  
      console.log(response.data.init_point);
      setPreferenceId(response.data.init_point);
      window.location.href = response.data.init_point;
      dispatch(deleteCart())
      //navigate(response.data.init_point)
    };
  
    
  }