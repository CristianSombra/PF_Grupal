const { Sequelize, ForeignKeyConstraintError } = require("sequelize");
const ProductModel = require("./models/Product"); 
const CartModel = require("./models/Cart");
const CategoryModel = require("./models/Category");
const BrandModel = require("./models/Brand")
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
UserModel(sequelize)


const { Product,  Cart, Category, Brand} = sequelize.models;

//Relacion productos/rating
Product.belongsTo(Brand, {foreignKey:'id_brand'} );
Product.belongsTo(Category, {foreignKey:'id_category'} );
 

//relacion entre user/rating




module.exports = { sequelize, ...sequelize.models };
