const { Rating , Product} = require("../db");


const getProductsWithRatings = async () => {
  try {
    // Realiza una consulta para obtener solo los productos que tienen calificaciones
    const productsWithRatings = await Product.findAll({
      include: [
        {
          model: Rating,
          attributes: ["rate", "review"], // Puedes especificar los campos que deseas incluir de la tabla Rating
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

  
 
const createRating = async (product_id, rate, review) => {
  try {
    const product = await Product.findOne({ where: { sku: product_id } });

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    // Crea un nuevo rating
    const newRating = await Rating.create({
      product_id,
      rate,
      review,
    });

    return newRating; // Devuelve el rating creado
  } catch (error) {
    console.error("Error al crear un rating:", error);
    throw error; // Lanza el error para que sea manejado en el controlador
  }
};

  
  
  
  module.exports = {
    getProductsWithRatings,
    createRating,
  };