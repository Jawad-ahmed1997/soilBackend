"use strict";
module.exports = (app, db) => {
    // Importing necessary modules
  var router = require("express").Router();
  var controller = require("../../controller/orderDetail.js")(db);

   // Define routes for create order'
  router.route("/order")
  .post(controller.createOrder)

// Define routes for 'get order by id '
  router.route("/order/:id")
  .get(controller.getOrderDetailsById)

  // Define routes for 'get all orders by userId '
  router.route("/Userorders/:id")
  .get(controller.getOrdersByUserId)

  app.use(router);
};
