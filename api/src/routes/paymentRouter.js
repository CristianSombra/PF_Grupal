const { Router } = require("express");
const { getAllPayments, createPayment } = require("../handlers/paymentHandler");

const paymentRouter = Router();

paymentRouter.get('/',getAllPayments);
paymentRouter.post('/',createPayment);

module.exports = paymentRouter; 
