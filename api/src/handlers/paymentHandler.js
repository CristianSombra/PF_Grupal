const paymentController = require('../controllers/paymentController');

module.exports = {

    getAllPayments: async (req, res) => {
    try {
      const payments = await paymentController.getAllPayments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
   
  createPayment: (req, res) => {
    paymentController.createPayment(req, res);
  }
};