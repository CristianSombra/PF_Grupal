const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Payment",
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      collection_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      merchant_order_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
