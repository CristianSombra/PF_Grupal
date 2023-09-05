const userController = require('../controllers/userController');

module.exports = {
  createUserHandler: async (req, res) => {
    const { user_name, first_name, last_name, gender, email, delivery_address, country, CustomElementRegistry, mobile, role, user_status, purchase_history, user_password} = req.body;
    try {
      await userController.createUser(user_name, first_name, last_name, gender, email, delivery_address, country, CustomElementRegistry, mobile, role, user_status, purchase_history, user_password);
      res.status(201).json("Creado Correctamente");
    } catch (error) {
      if (error.message.includes('llave duplicada') && error.message.includes('Users_email_key')) {
        res.status(400).json({ error: 'Correo ya registrado. Intente con otro correo.' });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }
};
