const categoryController = require('../controllers/categoryController');

module.exports = {

 createCategory: async (req, res) => {
  console.log(req.body)
  const { id_category, category_name, father_category } = req.body;
  try {
    const newCategory = await categoryController.createCategory(id_category, category_name, father_category);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  },
 
  getAllCategory: async (req, res) => {
    try {
      const category = await categoryController.getAllCategory();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },  

}
