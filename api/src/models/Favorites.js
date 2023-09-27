const { Sequelize, DataTypes } = require("sequelize"); // Importa Sequelize y DataTypes desde la librería

module.exports = (sequelize) => {
  sequelize.define(
    "Favorites", // Nombre del modelo
    {
      id: {
        type: DataTypes.INTEGER, // Tipo de dato para el ID
        allowNull: false,
        primaryKey: true, // Define el ID como clave primaria
        autoIncrement: true, // Permite que el ID se incremente automáticamente
      },
      products: {
        type: DataTypes.JSONB, // Tipo de dato para almacenar datos en formato JSONB (JSON binario)
        allowNull: false, // No se permite que la columna esté vacía
      },
    },
    { timestamps: false } // Desactiva las marcas de tiempo automáticas
  );
};