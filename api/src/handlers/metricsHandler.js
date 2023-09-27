const metricsController = require('../controllers/metricsController');

module.exports = {
    getTenProducts: (req, res) => {
    metricsController.getTenProducts(req, res);
  },

  getSalesPerMonthProducts: (req, res) => {
    metricsController.getSalesPerMonthProducts(req, res);
  }
};