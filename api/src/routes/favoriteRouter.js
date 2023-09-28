const { Router } = require("express");
const { addToFavorites, getFavoriteByID } = require("../handlers/favoriteHandler");

const favoriteRouter = Router(); 
favoriteRouter.post("/", addToFavorites);
favoriteRouter.get("/:userId", getFavoriteByID);

module.exports = favoriteRouter;