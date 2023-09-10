const { Router } = require("express");
const { getCartByUserId, addOrCreateCart } = require("../handlers/cartHandler");

const cartRouter = Router();

cartRouter.get('/:userId',  getCartByUserId);
cartRouter.post('/',  addOrCreateCart);

module.exports = cartRouter; 
