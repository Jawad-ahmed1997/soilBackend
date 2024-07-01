"use strict";
module.exports = (app, db) => {
  var router = require("express").Router();
  var controller = require("../../controller/user.js")(db);


  // Define routes for 'list of users and register user '
  router.route("/users")
  .get(controller.list)
  .post(controller.registerUser)
  
  // Define routes for 'login  '
  router.route("/users/login")
  .post(controller.loginUser)
  
  // Define routes for 'delete and update a user '
  router.route("/users/:id")
  .delete(controller.deleteUser)
  .put(controller.updateUser)

  // Define routes for 'forgot password '
  router.route("/users/send-token")
    .post(controller.forgotPassword);

    // Define routes for 'create new password'
  router.route("/users/reset-password/:token")
    .post(controller.resetPassword);

    
  app.use(router);
};
