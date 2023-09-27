const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      totalprice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      order_status: {
        type: DataTypes.ENUM("Completa", "Fallida", "En Proceso", "Pendiente de Pago", "Por Facturar"),
        allowNull: false,
      },
      products: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      }
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
