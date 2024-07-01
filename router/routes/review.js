"use strict";
module.exports = (app, db) => {
  var router = require("express").Router();
  var controller = require("../../controller/reviews")(db);

  // Define routes for 'create review and get reviews by ids '
  router.route("/review")
  .post(controller.CreateReview)
  .get(controller.getReviewbyIDS)


  // Define routes for 'update review and get reviews by user id '
  router.route("/review/:id")
  .put(controller.updateReview)
  .get(controller.getReviewByUserId)


  app.use(router);
};
