const userController = require('../controllers/userController');

module.exports = {
  getAllUsers: async(req, res) => {
    try {
      const users = await  userController.getAllUsers(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }       
  }
};
