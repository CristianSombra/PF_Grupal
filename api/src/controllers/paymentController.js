const { Payment, Order, User, DetailOrder, Product } = require("../db");
const { onlyDateCheck } = require("../helpers/validation");



const createPayment = async (req, res, next) => {
  // console.log(req.body);
  try {
   const { order_id, collection_id, payment_id, status, payment_type, merchant_order_id } = req.body;
  //  console.log(order_id);
   const order = await Order.findByPk(order_id)
  if(!order){
    return res.status(404).json({ message: "Order not found" });
  }
  if (status === 'approved') { // Verificar si el status es 'approved'
    order.order_status = 'Por Facturar'; // Cambiar el estado a 'Completado'
    await order.save(); // Guardar la orden actualizada
  }
   //  console.log(order);
    // Crear el registro del pago en la base de datos

    const newPayment = await Payment.create({
      collection_id: collection_id,
      order_id:order_id,
      payment_id: payment_id,
      status: status,
      payment_type: payment_type,
      merchant_order_id: merchant_order_id,
    });
    return res.status(200).json({ message: "Payment created" });
  } catch (error) {
    console.error("Payment was not created", error);
    return res.status(500).json({ message: "Payment was not created" });
  }
};

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