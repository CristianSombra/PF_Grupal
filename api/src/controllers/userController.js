const { user } = require('../db');

// const getProductBySKU = async (sku) => {
//   const product = await Product.findByPk(sku);
//   if (product) {
//     return product;
//   } else {
//     throw new Error('Product not found');
//   }
// };
// console.log("LLego acá");
const getAllUsers = async (req, res) => {
  
 try {
    const users = await user.findAll();
    return users;
  } catch (error) {
    throw new Error('Server error, could not get the users');
  }

}

// const getUsersById = async (req, res) => {
//   user.findAll()
//   .then((data) => {
//     res.json(data);
//   })
//   .catch(() => {
//     res.json({ error: error.message});
//   });


//   const { id } = req.params;
//   const project = await user.findByPk(id);
//   if (project === null) {
//     res.status(404).json({ error: "No existe el usuario" });
//   } else {
//     res.json(data);
//   }

// }




// const getProductsByBrand = async (id_brand) => {
//   try {
//     const productsByBrand = await Product.findAll({ where: { id_brand } });
//     if (productsByBrand.length > 0) {
//       return productsByBrand;
//     } else {
//       throw new Error('Products by brand not found');
//     }
//   } catch (error) {
//     throw new Error('Server Error, could not get products by brand');
//   }
// };

// const getBrands = async () => {
//   try {
//     const brandsArray = await Brand.findAll();
//     if (brandsArray.length > 0) {
//       return brandsArray;
//     } else {
//       throw new Error('Brands not found');
//     }
//   } catch (error) {
//     throw new Error('Server Error, could not get brands');
//   }
// };

// const getProductsByCategory = async (id_category) => {
//   try {
//     const productsByCategory = await Product.findAll({ where: { id_category } });
//     if (productsByCategory.length > 0) {
//       return productsByCategory;
//     } else {
//       throw new Error('Products by category not found');
//     }
//   } catch (error) {
//     throw new Error('Server Error, could not get products by brand');
//   }
// }

// const getCategories = async () => {
//   try {
//     const categoriesArray = await Category.findAll()
//     if (categoriesArray.length > 0) {
//       return categoriesArray;
//     } else {
//       throw new Error('Categories not found');
//     }
//   } catch (error) {
//     throw new Error('Server Error, could not get categories');
//   }
// }

const createUser = async (user_name, first_name, last_name, gender, email, delivery_address, country, CustomElementRegistry, user_status, purchase_history) => {
  try {
    const newUser = await user.create({
      user_name,
      first_name, 
      last_name, 
      gender, 
      email, 
      delivery_address, 
      country, 
      CustomElementRegistry, 
      user_status, 
      purchase_history,
    });
    return newUser;
  } catch (error) {
    throw new Error('Error creating users: ' + error.message);
  }
};

module.exports = { getAllUsers, createUser};

// module.exports = {
//     getAllUsers: (req, res) => {
//       res.status(200).json("Ruta Get All Users");

    

//     }
//   };
