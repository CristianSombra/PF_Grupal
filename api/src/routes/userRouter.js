const { Router } = require("express");
const {getAllUsers, createUser, getUserById, updateUsers } = require("../handlers/userHandler");

const routerUsers = Router();

routerUsers.post('/', createUser);
routerUsers.get('/', getAllUsers);
routerUsers.get('/id/:id', getUserById);
routerUsers.put('/id/:id', updateUsers);

module.exports = routerUsers;
