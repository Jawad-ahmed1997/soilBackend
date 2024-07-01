"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const env = require("./env.js");

const sequelize = new Sequelize(
    env.DATABASE_NAME,
    env.DATABASE_USERNAME,
    env.DATABASE_PASSWORD,
    {
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      dialect: "mysql",
    }
  );
  
  const db = {};

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.user = require("../models/user.js")(sequelize, Sequelize);
  db.orderDetails = require("../models/orderDetails.js")(sequelize, Sequelize);
  db.orderItems = require("../models/orderItems.js")(sequelize, Sequelize);
  db.products = require("../models/product.js")(sequelize, Sequelize);
  db.categories = require("../models/catergories.js")(sequelize, Sequelize);
  db.reviews = require("../models/rewies.js")(sequelize, Sequelize);

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  module.exports = db;