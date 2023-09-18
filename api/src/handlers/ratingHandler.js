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
      const { userId,product_id, rate, review } = req.body;
      const userRating = await ratingController.createRating(userId,product_id, rate, review);
      return res.status(201).json(userRating);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  getUserRatingPropertiesHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await ratingController.getUserRatingProperties(id);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
