// Importar el controlador de favoritos
const favoriteController = require('../controllers/favoriteController');

// Exportar un objeto con métodos que llaman a las funciones del controlador
module.exports = {
  // Método para agregar un producto a favoritos
  addToFavorites: (req, res) => {
    favoriteController.addToFavorites(req, res);
  },
  // Método para obtener los favoritos por ID de usuario
  getFavoriteByID: (req, res) => {
    favoriteController.getFavoriteByID(req, res);
  },
};