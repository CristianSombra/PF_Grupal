const { Payment, Order, User, DetailOrder, Product } = require("../db");
const { onlyDateCheck } = require("../helpers/validation");

require("dotenv").config();
const {
  ACCESS_TOKEN,
  BACK_URL_SUCCESS,
  BACK_URL_FAILED,
  BACK_URL_PENDING,
  PORT,
} = process.env;

const mercadopago = require("mercadopago");

//  Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const createPayment = async (req, res, next) => {
  /* const { orderId } = req.body; */
  //console.log("este es el body :", req.body);
  try {
    // Verificar si la orden existe
    /* const order = await Order.findByPk(orderId);
    //console.log("esta es la order:", order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    } */
   /*  const totalprice = parseFloat(order.dataValues.totalprice); */
   const { orderId, cart, total } = req.body;

   const preference = {
    items: [
      {
        title: "Total Order",
        unit_price: total, // Usar el total calculado
        quantity: 1,
      },
    ],
      back_urls: {
        success: BACK_URL_SUCCESS,
        failed: BACK_URL_FAILED,
      },
      auto_return: "approved",
      binary_mode: true,
      // notification_url:
      //   "https://",
      // //"https://",
    };

    //console.log("esta es la preferencia: ", preference);
    // Crear el objeto de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);
    //console.log("este es el payment :", response);
    const { id, init_point } = response.body;
    // Crear el registro del pago en la base de datos

    const newPayment = await Payment.create({
      order_date: new Date(), // Fecha de creación del pago
      total_order: 1000000, // Total de la orden
      payment_status: "approved", // Estado del pago
      id_payment: id.replace(/["-]/g, ""),
      active: true, // Estado activo del pago
    });
    //console.log(" este es el newPayment :", newPayment);
    // Asociar el pago a la orden
    /* await order.update({ paymentId: newPayment.id }); */
    // console.log("esta es la order actualizada: ", order);
    /* await newPayment.update({ orderId: order.id, userId: order.userId }); */
    //console.log("este es el pago updated 1: ", newPayment);
    //obtento usuario asociado al pago
    /* const user = await User.findByPk(newPayment.userId); */
    //obtengo los productos de las details orders compradas
    /* const detailorders = await DetailOrder.findAll({
      where: {
        orderId: order.id,
      },
      include: [Product],
    }); */
    //actualizo el campo purchase_history en user
   /*  const currentPurchaseHistory = user.purchase_history;

    const updatedPurchaseHistory = detailorders.map((detailorder) => ({
      productId: detailorder.productId,
      price: detailorder.price,
      quantity: detailorder.quantity,
    }));

    const mergedPurchaseHistory = [
      ...currentPurchaseHistory,
      ...updatedPurchaseHistory,
    ];
    await user.update({
      purchase_history: mergedPurchaseHistory,
    }); */

    /* console.log("purchase_history:", user.purchase_history); */

    return res.status(200).json({ message: "Payment created", init_point });
  } catch (error) {
    console.error("Payment was not created", error);
    return res.status(500).json({ message: "Payment was not created" });
  }
};
//!GET payments

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Order }, { model: User }],
    });
    return payments;
  } catch (error) {
    throw new Error("Product not found");
  }
};

module.exports = { getAllPayments, createPayment };