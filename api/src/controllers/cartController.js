const { Cart, User, Product } = require("../db");

module.exports = {
  // Controlador para agregar productos al carrito
  addToCart: async (req, res) => {
    const { userId, products } = req.body;
    try {
      // Buscar al usuario por su ID
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      if (Array.isArray(products)) {
        for (const product of products) {
          const requiredProps = ["sku", "quantity"];
          const missingProps = requiredProps.filter(prop => !product.hasOwnProperty(prop));

          if (missingProps.length > 0) {
            return res.status(400).json({ error: `Missing properties in product: ${missingProps.join(", ")}` });
          }
        }

        const simplifiedProducts = products.map(product => {
          return {
            sku: product.sku,
            quantity: product.quantity
          };
        });
        if (simplifiedProducts.length > 0) {
          const cart = await Cart.findOrCreate({
            where: { UserId: userId },
            defaults: {
              products: simplifiedProducts,
            }
          });
          await cart[0].update({ products: simplifiedProducts});
          
        } else {
          await Cart.destroy({
            where: { UserId: userId },
          })
        }
      }
      res.status(200).json("The cart has been successfully updated");
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: "Failed to add products to cart: " + error.message });
    }
  },


  getCartByID: async (req, res) => {
    const { userId } = req.params

    try {
      const cart = await Cart.findOne({
        where: { UserId: userId },
      });
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      const cartProducts = cart.products;
      const skuList = cartProducts.map((product) => product.sku);
      const products = [];
      for (const sku of skuList) {
        // Obtener el producto por su SKU desde el modelo Products
        const product = await Product.findByPk(sku.toString());
        if (product) {
          // Crear un objeto de producto con cantidad a comprar
          const productWithQuantity = {
            sku: product.sku,
            quantity: product.quantity,
            price: product.price,
            image: product.image,
            name: product.titulo,
          };
          products.push(productWithQuantity);
        }
      }

      // Agregar la cantidad a comprar del producto en el carrito
      const productsWithQuantityAndCart = products.map((product) => {
        const cartProduct = cartProducts.find((cp) => cp.sku === product.sku);
        return {
          ...product,
          quantity: cartProduct ? cartProduct.quantity : 0,
        };
      });

      res.status(200).json(productsWithQuantityAndCart);
    } catch (error) {
      res.status(400).json({ error: "Failed to get cart: " + error.message });
    }
  },
};