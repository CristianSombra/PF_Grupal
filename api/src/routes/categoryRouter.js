const { Router } = require("express");

const {createCategory, getAllCategory } = require("../handlers/categoryHandler");

const routerUsers = Router();

routerUsers.post('/', createCategory);
routerUsers.get('/', getAllCategory);


module.exports = routerUsers;
