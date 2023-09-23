const { User } = require('../db');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { JWT_KEY } = process.env;
const { encryptPassword, comparePassword } = require('./encrypt')
const { enviarCorreo } = require("../utils/sendEmail");
const fs = require('fs');

const createUser = async (user_name, first_name, last_name, gender, email, delivery_address, country, CustomElementRegistry, mobile, role, user_status, purchase_history, user_password) => {
  const newPassword = await encryptPassword(user_password)
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
    const userEmail = newUser.email;
    const plantillaEmailCreate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Correo de Bienvenida</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="width:50%;">
        <img src='https://dimaws-abogados.com.mx/wp-content/uploads/2021/09/Registro_Exitoso-removebg-preview.png' alt="Logo" style="width:50%;"/>
        </div>
        <h1 style="color: #333;">¡Bienvenido a nuestra tienda en línea!</h1>
          <p style="color: #666;">Estamos emocionados de tenerte como cliente.</p>
          <p style="color: #666;">Tu usuario es:</p>
          <p style="color: rgba(1,86,255,255);">${userEmail}</p>
          </div>
      </body>
      </html>`
    enviarCorreo(userEmail, '¡Te damos la bienvenida!', plantillaEmailCreate);

    const token = jwt.sign({ email, role }, JWT_KEY);
    return {
      user: newUser,
      msg: 'success',
      token: token,
    }

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
    const newPasswordEncrypt = await encryptPassword(newPassword)
    const userUpdate = await User.update(
      { user_password: newPasswordEncrypt },
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
    throw new Error(error.message);
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

    const compare = await comparePassword(user_password, result.user_password)
    if (compare) {
      // console.log("password: " + result.user_password);
      const token = jwt.sign({ email, role: result.role }, JWT_KEY);
      return {
        msg: 'success',
        token: token,
        user: result
      }

    }
    else throw new Error('Server Error, email o password invalid');

  } catch (error) {
    throw new Error('Server Error, falla al iniciar sesión');
  }


}

const loginGoogle = async (user_name, first_name, last_name, gender, email, delivery_address, country, CustomElementRegistry, mobile, role, user_status, purchase_history, user_password) => {
  try {

    const newUser = await User.findOrCreate({
      where: {
        email: email
      },
      defaults: {
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
        user_password,
      }
    });

    const token = jwt.sign({ email, role }, JWT_KEY);
    return {
      user: newUser[0],
      msg: 'success',
      token: token,
    }

  } catch (error) {
    throw new Error('Error creating users: ' + error.message);
  }
};

module.exports = { getAllUsers, createUser, getUserById, updateUsers, loginUsers, getUserByEmail, deleteUsers, loginGoogle };
