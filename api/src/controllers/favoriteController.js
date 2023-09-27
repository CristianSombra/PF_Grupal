const { Favorites, User, Product } = require("../db");

module.exports = {
  addToFavorites: async (req, res) => {
    const { userId, products } = req.body;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
  
      if (Array.isArray(products)) {
        for (const product of products) {
          if (!product.hasOwnProperty("sku")) {
            return res.status(400).json({ error: "Product missing 'sku' property" });
          }
        }
  
        const simplifiedProducts = products.map(product => {
          return {
            sku: product.sku
          };
        });

        if (simplifiedProducts.length > 0) {
        const favorites = await Favorites.findOrCreate({
          where: { UserId: userId },
          defaults: {
            products: simplifiedProducts
          }
        });
        await favorites[0].update({ products: simplifiedProducts });
      } else{
        await Favorites.destroy({
          where: { UserId: userId },
        })
      }
    }
      res.status(200).json("Favorites have been successfully updated");
    } catch (error) {
      res.status(400).json({ error: "Failed to add products to favorites: " + error.message });
    }
  },
  

  // Controlador para obtener los favoritos por el ID del usuario
  getFavoriteByID: async (req, res) => {
    const { userId } = req.params;
    try {

      const favorites = await Favorites.findOne({
        where: { UserId: userId },
      });
      
      if (!favorites) {
        return res.status(404).json({ error: "Favorites not found" });
      }
  
      const favoriteProducts = favorites.products;
      const skuList = favoriteProducts.map((product) => product.sku);
      const products = [];

      for (const sku of skuList) {
        const product = await Product.findByPk(sku.toString());
        if (product) {
          const productWithQuantity = {
            sku: product.sku,
            price: product.price,
            image: product.image,
            name: product.titulo,
          };
          products.push(productWithQuantity);
        }
      }

      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: "Failed to get favorites: " + error.message });
    }
  },  
};