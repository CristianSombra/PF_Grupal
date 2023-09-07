const brandController = require('../controllers/brandController');

module.exports = {

 createBrand: async (req, res) => {
  console.log(req.body)
  const { id_brand, brand_name } = req.body;
  try {
    const newBrand = await brandController.createBrand(id_brand, brand_name);
    res.status(200).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  },
 
  getAllBrands: async (req, res) => {
    try {
      const brands = await brandController.getAllBrands();
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },  

}
