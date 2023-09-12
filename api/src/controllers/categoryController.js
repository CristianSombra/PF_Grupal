const { Category } = require('../db');

const createCategory = async (id_category, category_name, father_category) => {
  try {
    const newCategory = await Category.create({
        id_category, 
        category_name, 
        father_category
    });
    return newCategory;
  } catch (error) {
    throw new Error('Error creating category: ' + error.message);
  }
};

const getAllCategory = async (req, res) => {
  
 try {
    const category = await Category.findAll();
    return category;
  } catch (error) {
    throw new Error('Server error, could not get the category');
  }

};
module.exports = { createCategory, getAllCategory };