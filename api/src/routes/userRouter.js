const { Router } = require("express");
<<<<<<< HEAD
const {getAllUsers, createUser, getUserById, updateUsers } = require("../handlers/userHandler");

const routerUsers = Router();

routerUsers.post('/', createUser);
routerUsers.get('/', getAllUsers);
routerUsers.get('/id/:id', getUserById);
routerUsers.put('/id/:id', updateUsers);
=======
const {createUserHandler} = require("../handlers/userHandler");

const routerUsers = Router();

routerUsers.post('/',  createUserHandler);
>>>>>>> a5a4a4b87233ff1c0d4cce2d47823aa80b79d5f7

module.exports = routerUsers;
