const { Brand } = require('../db');

const createBrand = async (id_brand, brand_name) => {
  try {
    const newBrand = await Brand.create({
      id_brand,
      brand_name
    });
    return newBrand;
  } catch (error) {
    throw new Error('Error creating Brand: ' + error.message);
  }
};

const getAllBrands = async (req, res) => {
  
 try {
    const brand = await Brand.findAll();
    return brand;
  } catch (error) {
    throw new Error('Server error, could not get the brand');
  }

};

// const getBrandById = async (id) => {
//   const userId = await Brand.findByPk(id);
//   if (userId) {
//     return userId;
//   } else {
//     throw new Error('User not found');
//   }
// };

// const updateBrand = async (userId, newPassword ) => {

// try {
//       const userUpdate = await Brand.update(
//         { user_password: newPassword },
//         { where: {id: userId} }
//         );
//  return userUpdate;
// } 
// catch (error) { throw new Error('Error updating users: ' + error.message);
// }
 
// };

module.exports = { createBrand, getAllBrands };
