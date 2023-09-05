const { Sequelize, ForeignKeyConstraintError } = require("sequelize");
const ProductModel = require("./models/Product"); 
const CartModel = require("./models/Cart");
const CategoryModel = require("./models/Category");
<<<<<<< HEAD
const BrandModel = require("./models/Brand")
=======
const BrandModel = require("./models/Brand");
>>>>>>> a5a4a4b87233ff1c0d4cce2d47823aa80b79d5f7
const UserModel = require("./models/User")
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/PFHenry`,
  { logging: false }
);


ProductModel(sequelize);
CartModel(sequelize);
CategoryModel(sequelize);
BrandModel(sequelize);
<<<<<<< HEAD
UserModel(sequelize)
=======
UserModel(sequelize);
>>>>>>> a5a4a4b87233ff1c0d4cce2d47823aa80b79d5f7


const { Product,  Cart, Category, Brand, User} = sequelize.models;

Product.belongsTo(Brand, {foreignKey:'id_brand'} );
Product.belongsTo(Category, {foreignKey:'id_category'} );

User.hasMany(Cart);
Cart.belongsTo(User);


module.exports = { sequelize, ...sequelize.models };
