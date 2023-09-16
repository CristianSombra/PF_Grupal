const { Router } = require("express");
const { getAllOrders, createOrder, modifyOrder, getOrderById } = require("../handlers/orderHandler");


const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post("/create", createOrder);
orderRouter.put("/update/:id", modifyOrder);
orderRouter.get("/:id", getOrderById);

module.exports = orderRouter; 
