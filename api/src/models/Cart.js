const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      products: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      }
    },
    {
      timestamps: false,
    }
  );
};

