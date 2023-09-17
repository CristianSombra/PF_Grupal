const { User } = require('../db');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { JWT_KEY } = process.env;
const {encryptPassword, comparePassword}=require('./encrypt')

const createUser = async (user_name, first_name, last_name, gender, email, delivery_address, country, CustomElementRegistry, mobile, role, user_status, purchase_history, user_password) => {
  const newPassword=await encryptPassword(user_password)
  // console.log(newPassword);
  try {
    const newUser = await User.create({
      user_name,
      first_name,
      last_name,
      gender,
      email,
      delivery_address,
      country,
      CustomElementRegistry,
      mobile,
      role,
      user_status,
      purchase_history,
      user_password: newPassword
    });

    const token = jwt.sign({ email, role }, JWT_KEY);
      return { user: newUser,
        msg:'success' ,
        token: token,
        // id: result.id,
        // user_name: result.user_name,
        // first_name: result.first_name,
        // last_name: result.last_name,
        // role: result.role,
      }

    // return newUser;
  } catch (error) {
    throw new Error('Error creating users: ' + error.message);
  }
};

const getAllUsers = async (req, res) => {

  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error('Server error, could not get the users');
  }

};

const getUserById = async (id) => {
  const userId = await User.findByPk(id);
  if (userId) {
    return userId;
  } else {
    throw new Error('User not found');
  }
};

const getUserByEmail = async (email) => {  
    const userId = await User.findOne({ where: { email } });    
    if (userId) {
      return userId;
    } else {
      throw new Error('User not found');
    }
};

const updateUsers = async (userId, newPassword) => {

  try {
    const userUpdate = await User.update(
      { user_password: newPassword },
      { where: { id: userId } }
    );
    return userUpdate;
  }
  catch (error) {
    throw new Error('Error updating users: ' + error.message);
  }

};

const deleteUsers = async (email) => {

  try {
    await User.destroy({
      where: {
        email
      },
      // force: true
    })  
  }
  catch (error) {
    throw new Error( error.message);
  }
};


const loginUsers = async (email, user_password) => {
  let result
  if (!email || !user_password)
    return res.status(400).json({ error: 'The necessary data to enter was not sent' });

  try {
    //Buscamos el usuario en la base de datos
    result = await User.findOne({
      where: {
        email,
        user_status: true
      }
    });

    const compare= await comparePassword (user_password, result.user_password)
    if (compare) {
      // console.log("password: " + result.user_password);
      const token = jwt.sign({ email, role: result.role }, JWT_KEY);
      return {
        msg:'success' ,
        token: token,
        user: result
      }

    }
    else throw new Error('Server Error, email o password invalid');

  } catch (error) {
    throw new Error ('Server Error, falla al iniciar sesión');
  }


}

module.exports = { getAllUsers, createUser, getUserById, updateUsers, loginUsers, getUserByEmail, deleteUsers };
