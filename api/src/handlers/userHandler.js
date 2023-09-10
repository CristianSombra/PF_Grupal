const userController = require('../controllers/userController');

module.exports = {
  createUser: async (req, res) => {
    console.log(req.body)
    const { user_name,first_name, last_name,gender,email,delivery_address,country,CustomElementRegistry,mobile,role,user_status, purchase_history,user_password } = req.body;
    try {
      const newUser = await userController.createUser(user_name,first_name, last_name,gender,email,delivery_address,country,CustomElementRegistry,mobile,role,user_status, purchase_history,user_password);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async(req, res) => {
    try {
      const users = await  userController.getAllUsers(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }       
  },

getUserById: async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const userId = await userController.getUserById(id);
    res.status(200).json(userId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

updateUsers: async (req, res) => {
  // console.log(req.body)
  const id = req.params.id;
  const { user_password } = req.body;
console.log("iD= " + id);
console.log("iD2= " + user_password);
  try {
    const updateUser = await userController.updateUsers(id, user_password );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

}
