"use strict";
module.exports = (app, db) => {
  var router = require("express").Router();
  var controller = require("../../controller/product")(db);

  // Define routes for 'get product list'
  router.route("/products")
  .get(controller.list)
 
  // Define routes for 'create product '
  router.route("/product")
  .post(controller.createProduct)

    
  app.use(router);
};
