"use strict";


// Exporting a function that sets up category routes
module.exports = (app, db) => {
  // Importing necessary modules
  var router = require("express").Router(); // Express router for defining routes
  var controller = require("../../controller/categories")(db); // Controller for category operations

  // Define routes for categories list'
  router.route("/categories")
    .get(controller.list); // GET request to retrieve all categories

  // Define routes for 'create category '
  router.route("/category")
    .post(controller.createCategory); // POST request to create a new category

  // Mount the router middleware on the app
  app.use(router); // This attaches the router to the app, making the defined routes accessible
};