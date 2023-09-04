const cartController = require('../controllers/cartController');

module.exports = {
  getCartByUserId: (req, res) => {
    cartController.getCartByUserId(req, res);
  },

  addOrCreateCart: (req, res) => {
    cartController.addOrCreateCart(req, res);
  }
};