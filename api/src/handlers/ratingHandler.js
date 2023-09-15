// handlers.js
const ratingController = require("../controllers/ratingController");

module.exports = {
  getProductRatingshandler: async (req, res) => {
    try {
      const productsWithRatings = await ratingController.getProductsWithRatings();
      return res.status(200).json(productsWithRatings);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  createRatinghandler: async (req, res) => {
    try {
      const { product_id, rate, review } = req.body;
      const newRating = await ratingController.createRating(product_id, rate, review);
      return res.status(201).json(newRating);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
