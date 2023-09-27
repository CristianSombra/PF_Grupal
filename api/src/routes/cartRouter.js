const { Router } = require("express");
const { addToCart, getCartByID } = require("../handlers/cartHandler");

const cartRouter = Router(); 
cartRouter.post("/", addToCart); 
cartRouter.get("/:userId", getCartByID);

module.exports = cartRouter;