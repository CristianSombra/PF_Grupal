const { Product, UserRating, User } = require("../db");


const getProductsWithRatings = async () => {
  try {
    // Realiza una consulta para obtener solo los productos que tienen calificaciones
    const productsWithRatings = await Product.findAll({
      include: [
        {
          model: UserRating,
          attributes: ["userId","product_id","rate", "review"], // Puedes especificar los campos que deseas incluir de la tabla Rating
          required: true, // Esto asegura que solo se incluyan los productos con calificaciones en los resultados
        },
      ],
    });

    return productsWithRatings; // Devuelve los productos con calificaciones
  } catch (error) {
    console.error("Error al obtener productos con calificaciones:", error);
    throw error;
  }
};

  
 
const createRating = async (userId,product_id, rate, review) => {
  try {
    
    let userRating = await UserRating.findOne({
      where: { userId, product_id },
    });

    if (!userRating) {
      // Si no existe una calificación, crea una nueva
      userRating = await UserRating.create({ userId, product_id, rate, review });
      return userRating
    } else {
      // Si ya existe una calificación, actualízala
      userRating.rate = rate;
      userRating.review = review;
      await userRating.save();
      return userRating
    }

  } catch (error) {
    console.error("Error al crear un rating:", error);
    throw error; // Lanza el error para que sea manejado en el controlador
  }
};

const getUserRatingProperties = async (id) => {
  try {
    

    // Busca el usuario y sus calificaciones por el id proporcionado
    const user = await User.findOne({
      where: { id },
      attributes: ['user_name'], // Propiedad user_name de User
      include: [
        {
          model: UserRating,
          attributes: ['rate', 'review',"product_id"], // Propiedades rate y review de UserRating
        },
      ],
    });

    if (!user) {
      console.log(user);
      return { message: 'Usuario no encontrado' };
    }

    return user;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
  
  module.exports = {
    getProductsWithRatings,
    createRating,
    getUserRatingProperties,
    
  };