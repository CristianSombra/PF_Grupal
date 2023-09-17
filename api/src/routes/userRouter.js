const { Router } = require("express");

const {getAllUsers, createUser, getUserById, updateUsers, loginUsers, deleteUsers, loginGoogle } = require("../handlers/userHandler");
const {verifyAdminToken, verifyUserToken} = require('../controllers/verifyToken')
const routerUsers = Router();

routerUsers.post('/', createUser);
routerUsers.post('/google', loginGoogle);
routerUsers.get('/', getAllUsers);
routerUsers.get('/id/:id', getUserById);
routerUsers.put('/id/:id', verifyUserToken , updateUsers);

routerUsers.post('/login', loginUsers);
routerUsers.delete('/id/:email', verifyAdminToken, deleteUsers);

module.exports = routerUsers;
