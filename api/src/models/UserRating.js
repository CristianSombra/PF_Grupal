const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "UserRating",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID, // Debe coincidir con el tipo de ID en tu modelo User
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER, // Debe coincidir con el tipo de ID en tu modelo Product
        allowNull: false,
      },
      rate: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1,
          max: 5,
        },
      },
      review: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
