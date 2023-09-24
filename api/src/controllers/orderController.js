 
  const { Order, User, Detailorder, Product } = require("../db");

  const {
    onlyNumbersCheck,
    onlyLettersCheck,
    onlyLettersOrNumbersCheck,
  } = require("../helpers/validation.js");
const { enviarCorreo } = require("../utils/sendEmail");
  
  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.findAll();
  
      return orders
    } catch (error) {
      throw new Error(error);
    }
  };
  
  const getOrderById = async (req, res, next) => {
    const { id } = req.params;
    let check = onlyNumbersCheck(id);
    if (check !== true) return res.status(412).json({ message: "Invalid Input" });
    try {
      const order = await Order.findByPk(id);
      order
        ? res.status(200).json(order)
        : res.status(404).json({ message: "The searched order is not found" });
    } catch (error) {
      res.status(404).json(error.message);
    }
  };

//para crear la orden hay que obtener el id de detaiOrders, sus precios y cantides. Para luego relacionar las DetailOrders con su respectiva order y obtener el totalPrice.
// const createOrder = async (req, res, next) => {
//   const { detailIds, userId } = req.body;

//   try {
//     // Verificar si ya existe una orden para los detalles proporcionados y el usuario
//     const existingOrder = await Order.findOne({
//       where: {
//         userId: userId, // Filtrar por el ID del usuario
//       },
//       include: [
//         {
//           model: Detailorder,
//           where: {
//             detail_id: detailIds, // Filtrar por los IDs de los detalles
//           },
//         },
//       ],
//     });

//     if (existingOrder) {
//       return res.status(409).json({
//         message: "There is an order created for all the details_id given",
//       });
//     }
//     // Obtener las Detailorders correspondientes a los IDs indicados
//     const detailorders = await Detailorder.findAll({
//       where: {
//         detail_id: detailIds, // Filtrar por los IDs indicados
//         userId: userId, // Filtrar por el ID del usuario
//       },
//       include: [Product], // Incluir el modelo Product si es necesario
//     });

//     if (detailorders.length === 0) {
//       return res.status(404).json({
//         message: "IDs and User requested are not found",
//       });
//     }

//     // Calcular el precio total de la orden sumando las multiplicaciones de cantidad y precio de las Detailorders
//     let totalOrderPrice = 0;
//     detailorders.forEach((detailorder) => {
//       const totalPricePerItem = detailorder.price * detailorder.quantity;
//       totalOrderPrice += totalPricePerItem;
//     });

//     // Crear la nueva orden
//     const newOrder = await Order.create({
//       totalprice: totalOrderPrice,
//       order_status: "in process",
//       userId: userId,
//       // Asignar el ID del usuario a la orden
//     });
//     // Asignar el ID del usuario a la orden
//     await newOrder.setUser(userId);
//     await Promise.all(
//       detailorders.map((detailorder) => detailorder.setOrder(newOrder))
//     );
//     // Agregar el ID de la orden al usuario
//     const user = await User.findByPk(userId);
//     if (user) {
//       await user.addOrder(newOrder);
//     }
//     return res.status(200).json({ message: "Order created", order: newOrder });
//   } catch (error) {
//     console.error("Order was not created", error);
//     return res.status(500).json({ message: "Order was not created" });
//   }
// };

// const modifyOrder = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const { id } = req.params;

//     if (!id) return res.status(400).json({ error: "Id is needed" });

//     const order = await Order.findByPk(id);

//     if (!order) return res.status(400).json({ error: "Non-existent Order" });

//     let modifications = {};

//     if (status) {
//       modifications = {
//         ...modifications,
//         order_status: status,
//       };
//     }

//     let modifiedOrder = await order.update(modifications);

//     res.status(201).json(modifiedOrder);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const createOrder = async (req, res, next) => {
  const { userId, totalprice} = req.body;

  try {

    const newOrder = await Order.create({
      totalprice: totalprice,
      order_status: "En Proceso",
      user_id: userId, // Asignar el ID del usuario a la orden
    });
    const user =await User.findByPk(userId)
    const userEmail = user.email;
    const plantillaEmailCreate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Orden Creada Con Exito</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="width:50%;">
        <img src='https://dimaws-abogados.com.mx/wp-content/uploads/2021/09/Registro_Exitoso-removebg-preview.png' alt="Logo" style="width:50%;"/>
        </div>
        <h1 style="color: #333;">¡Muchas Gracias Por Tu Compra!</h1>
          <p style="color: #666;">En el transcurso del día estaras recibiendo mas detalles de tu envio.</p>
          </div>
      </body>
      </html>`
    enviarCorreo(userEmail, '¡Orden Creada!', plantillaEmailCreate);
    return res.status(200).json({ message: "Order created", order: newOrder });
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







module.exports = { createOrder, getAllOrders, getOrderById, modifyOrder};
