const { Router } = require("express");
const { getProductsWithRatings} = require("../controllers/ratingController");
const {  createRating } = require("../controllers/ratingController");
const ratingRouter = Router();

ratingRouter.post('/', createRating); // Crear una nueva calificación
ratingRouter.get('/', getProductsWithRatings); // Obtener todas las calificaciones


module.exports = ratingRouter;
