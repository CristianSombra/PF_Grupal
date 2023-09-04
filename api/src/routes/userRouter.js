const { Router } = require("express");
const {createUserHandler} = require("../handlers/userHandler");

const routerUsers = Router();

routerUsers.post('/',  createUserHandler);

module.exports = routerUsers;
