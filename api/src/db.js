const { Sequelize, ForeignKeyConstraintError } = require("sequelize");
const ProductModel = require("./models/Product"); 
const CartModel = require("./models/Cart");
const CategoryModel = require("./models/Category");
const BrandModel = require("./models/Brand")
const UserModel = require("./models/User")
const UseratingModel = require("./models/UserRating");
const PaymentModel = require('./models/Payment');
const OrderModel = require('./models/Order');
const FavoriteModel = require('./models/Favorites');
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);


ProductModel(sequelize);
CartModel(sequelize);
CategoryModel(sequelize);
BrandModel(sequelize);
UserModel(sequelize);
UseratingModel(sequelize);
PaymentModel(sequelize);
OrderModel(sequelize);
FavoriteModel(sequelize)

const { Product,  Cart, Category, Brand, User, UserRating, Favorites } = sequelize.models;

Product.belongsTo(Brand, {foreignKey:'id_brand'} );
Product.belongsTo(Category, {foreignKey:'id_category'} );
User.hasMany(UserRating, { foreignKey: "userId" });
Product.hasMany(UserRating, { foreignKey: "product_id" });


User.hasMany(Favorites);
Favorites.belongsTo(User);

User.hasMany(Cart);
Cart.belongsTo(User);

module.exports = { sequelize, ...sequelize.models };
