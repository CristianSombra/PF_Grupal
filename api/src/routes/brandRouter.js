const { Router } = require("express");

const {getAllBrands, createBrand, getBrandById, updateBrand } = require("../handlers/brandHandler");

const routerUsers = Router();

routerUsers.post('/', createBrand);
routerUsers.get('/', getAllBrands);


module.exports = routerUsers;
