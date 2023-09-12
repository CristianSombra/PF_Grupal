const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
       },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("F", "M", "X"),
        allowNull: false,
        defaultValue: 'X'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      delivery_address: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'DIRECCION INDEFENIDA'
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PAIS INDEFENIDA'
      },
      CustomElementRegistry: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'INDEFENIDA'
      },
      mobile: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("Administrador", "Cliente"),
        allowNull: false,
        defaultValue: 'Cliente'
      },
      user_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      purchase_history: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Contraseña'
      },
    },
    {
      timestamps: false,
    }
  );
};
