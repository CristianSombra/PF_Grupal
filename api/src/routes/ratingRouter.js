const { Router } = require("express");
const { getProductRatingshandler} = require("../handlers/ratingHandler");
const {  createRatinghandler } = require("../handlers/ratingHandler");
const ratingRouter = Router();

ratingRouter.post('/', createRatinghandler); // Crear una nueva calificación
ratingRouter.get('/', getProductRatingshandler); // Obtener todas las calificaciones


module.exports = ratingRouter;
