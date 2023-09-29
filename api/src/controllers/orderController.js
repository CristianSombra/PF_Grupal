const { Order, User, Detailorder, Product } = require("../db");

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

const {
  onlyNumbersCheck,
  onlyLettersCheck,
  onlyLettersOrNumbersCheck,
} = require("../helpers/validation.js");
const { enviarCorreo } = require("../utils/sendEmail");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();

    return orders;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrderById = async (id) => {
  try {
    const order = await Order.findByPk(id);
    if (order) {
      return order;
    } else {
      throw new error({ message: "The searched order is not found" });
    }
  } catch (error) {
    throw new error();
  }
};

const getOrderByUserId = async (req, res) => {
  const {
    userId
  } = req.params
  try {
    const order = await Order.findAll({where:{user_id:userId}});
    if (order) {
        return order;
    } else {
      throw new error({ message: "The searched order is not found" });
    }
  } catch (error) {
    throw new error();
  }
};



const createOrder = async (req, res, next) => {
  const { userId, totalprice, products } = req.body;
  const preference = {
    items: [
      {
        title: "Total Order",
        unit_price: Number(totalprice),
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

    };

    // Crear el objeto de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);
    //console.log("este es el payment :", response);
    const { id, init_point } = response.body;


  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newOrder = await Order.create({
      totalprice: totalprice,
      order_status: "En Proceso",
      user_id: userId, // Asignar el ID del usuario a la orden
      products: products,
    });
    const userEmail = user.email;
    const plantillaEmailCreate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Solicitud de pedido recibida</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="width:50%;">
        <img src='https://dimaws-abogados.com.mx/wp-content/uploads/2021/09/Registro_Exitoso-removebg-preview.png' alt="Logo" style="width:50%;"/>
        </div>
        <h1 style="color: #333;">¡Muchas Gracias Por Tu Solicitud!</h1>
          <p style="color: #666;">En el transcurso del día estaras recibiendo mas detalles sobre tu orden de compra.</p>
          </div>
      </body>
      </html>`;
    enviarCorreo(userEmail, "¡Orden Creada!", plantillaEmailCreate);
    return res.status(200).json({ message: "Order created", order: newOrder, init_point });
  } catch (error) {
    console.error("Order was not created", error);
    return res.status(500).json({ message: "Order was not created" });
  }
};

const modifyOrder = async (req, res) => {
  try {
    const { order_status } = req.body;
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Id is needed" });

    const order = await Order.findByPk(id);

    if (!order) return res.status(400).json({ error: "Non-existent Order" });

    order.order_status = order_status; // Actualiza el estado de la orden
    await order.save(); // Guarda la orden actualizada en la base de datos

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, modifyOrder, getOrderByUserId };
