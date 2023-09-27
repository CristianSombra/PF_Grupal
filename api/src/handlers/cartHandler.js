// Importar el controlador de carrito
const cartController = require('../controllers/cartController');

// Exportar un objeto con métodos que llaman a las funciones del controlador
module.exports = {
  // Método para agregar un producto al carrito
  addToCart: (req, res) => {
    cartController.addToCart(req, res);
  },
  // Método para obtener el carrito por ID de usuario
  getCartByID: (req, res) => {
    cartController.getCartByID(req, res);
  },
};