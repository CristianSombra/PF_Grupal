const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Rating",
    {
      rating_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1,
          max: 5,
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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