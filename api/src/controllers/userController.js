const { user } = require('../db');

const createUser = async (user_name,first_name, last_name,gender,email,delivery_address,country,CustomElementRegistry,mobile,role,user_status, purchase_history,user_password) => {
  try {
    const newUser = await user.create({
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
      user_password
    });
    return newUser;
  } catch (error) {
    throw new Error('Error creating users: ' + error.message);
  }
};

const getAllUsers = async (req, res) => {
  
 try {
    const users = await user.findAll();
    return users;
  } catch (error) {
    throw new Error('Server error, could not get the users');
  }

};

const getUserById = async (id) => {
  const userId = await user.findByPk(id);
  if (userId) {
    return userId;
  } else {
    throw new Error('User not found');
  }
};

const updateUsers = async (userId, newPassword ) => {

try {
      const userUpdate = await user.update(
        { user_password: newPassword },
        { where: {id: userId} }
        );
 return userUpdate;
} 
catch (error) { throw new Error('Error updating users: ' + error.message);
}
 
};

module.exports = { getAllUsers, createUser, getUserById, updateUsers};
