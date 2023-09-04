const {User} = require("../db")
module.exports = {
  createUser: async (user_name, first_name, last_name, gender, email, delivery_address, country, CustomElementRegistry, mobile, role, user_status, purchase_history, user_password) => {
    const newUser = await User.create({ user_name, first_name, last_name, gender, email, delivery_address, country, CustomElementRegistry, mobile, role, user_status, purchase_history, user_password });
  }
  };
  