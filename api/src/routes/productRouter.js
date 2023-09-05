const { Router } = require("express");
const { getAllProducts, getBrands, getProductBySKU, getProductsByBrand, getProductsByCategory, getCategories, createProduct, productsFilter } = require("../handlers/productsHandler");

const productsRouter = Router();

productsRouter.get('/sku/:sku', getProductBySKU);
productsRouter.get('/',  getAllProducts);
productsRouter.get('/brands/:id_brand', getProductsByBrand);
productsRouter.post('/filter', productsFilter)
productsRouter.get('/brands', getBrands);
productsRouter.get('/categories/:id_category', getProductsByCategory);
productsRouter.get('/categories', getCategories); 
productsRouter.post('/', createProduct);

module.exports = productsRouter; 
