const { Router } = require("express");

const {createBrand, getAllBrands } = require("../handlers/brandHandler");

const routerUsers = Router();

routerUsers.post('/', createBrand);
routerUsers.get('/', getAllBrands);


module.exports = routerUsers;
