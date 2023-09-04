const { Cart, User, Product } = require("../db");


module.exports = {

  addOrCreateCart: async (req, res) => {
    const { userId, products } = req.body;
    try {
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
  
        if (simplifiedProducts.length>0){
        const cart = await Cart.findOrCreate({
          where: { UserId: userId },
        });
        await cart[0].update({ products: simplifiedProducts});
      } else {
        await Cart.destroy({
          where: { UserId: userId },
        })
      }

      }
      res.status(200).json("Cart Updated Successfully");
    } catch (error) {
      res.status(400).json({ error: "Failed to add products to cart: " + error.message });
    }
  },
  
  getCartByUserId: async (req, res) => {
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
        const product = await Product.findByPk(sku);

        if (product) {
          const productWithQuantity = {
            sku: product.sku,
            price: product.price,
            disponibility: product.disponibility,
            image: product.image,
            titulo: product.titulo,
          };
          products.push(productWithQuantity);
        }
      }

      const productsWithQuantityAndCart = products.map((product) => {
        console.log(cartProducts);
        console.log(product.sku)
        const cartProduct = cartProducts.find((cp) => cp.sku.toString() === product.sku.toString())
        console.log(cartProduct)
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