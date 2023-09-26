const productController = require('../controllers/productController');

module.exports = {

  getProductBySKU: async (req, res) => {
    const sku = req.params.sku;
    try {
      const product = await productController.getProductBySKU(sku);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await productController.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductsByBrand: async (req, res) => {
    const id_brand = req.params.id_brand;
    try {
      const productsByBrand = await productController.getProductsByBrand(id_brand);
      res.status(200).json(productsByBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBrands: async (req, res) => {
    try {
      const brands = await productController.getBrands();
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductsByCategory: async (req, res) => {
    const id_category = req.params.id_category;
    try {
      productsByCategory = await productController.getProductsByCategory(id_category);
      res.status(200).json(productsByCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await productController.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduct: async (req, res) => {
    console.log(req.body)
    const { sku, number_part, titulo, id_brand, id_category, detail, price, image, disponibility, createdInDb } = req.body;
    try {
      const newProduct = await productController.createProduct(sku, number_part, titulo, id_brand, id_category, detail, price, image, disponibility, createdInDb);
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  productsFilter: async (req, res) => {
    const {id_brand, id_category} = req.body;
    try {
      const newProducts = await productController.productsFilter(id_brand, id_category);
      res.status(200).json(newProducts);
    } catch (error){
      res.status(500).json({error: error.message})
    }
  },

  updateProduct: async (req, res) => {
    const { productId } = req.params; 
    const { updatedFields } = req.body;
    try {
      const updatedProduct = await productController.updateProduct(productId, updatedFields);
      res.status(200).json(updatedProduct)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }

}
