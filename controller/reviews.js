const bcrypt = require("bcrypt");
const env = require("../config/env");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Sequelize } = require("sequelize");
const generateToken = require("../utils/generateToken");

module.exports = (db) => {
  return {

    // Function to create a new review
CreateReview: async (req, res) => {
  // Extract review data from the request body
  const {
      item_id,
      rating,
      comment,
      user_id,
      order_id,
      created_by,
      updated_by,
  } = req.body;

  try {
      // Create a new review in the database
      const newReview = await db.reviews.create({
          item_id,     // ID of the item being reviewed
          rating,      // Rating given by the user
          comment,     // Comment provided by the user
          user_id,     // ID of the user who is creating the review
          order_id,    // ID of the order related to the review
          created_by,  // ID of the user who created the review (could be same as user_id)
          updated_by,  // ID of the user who last updated the review (initially same as created_by)
      });

      // Send a 201 response with the created review
      res.status(201).json({
          message: "Review created successfully", // Success message
          review: newReview,                      // Return the newly created review object
      });
  } catch (err) {

      // Send a 500 response indicating an internal server error
      res.status(500).json({
          message: "Error creating review", // Error message
          error: err,                      // Include the error details
      });
  }
},



    // Get a review by multiple IDs: item_id for item, user_id for user, order_id for order
    //item_id for item 
    //user_id for user 
    //order_id for order
    getReviewbyIDS: async (req, res) => {
      try {
        // Extract parameters from the query string
        const { item_id, user_id, order_id } = req.query;
        // Validate that all required parameters are provided
        if (!item_id || !user_id || !order_id) {
          return res.status(400).send({
            message: "Missing required parameters",
          });
        }
        // Query the database for the review matching the provided item_id, user_id, and order_id
        const review = await db.reviews.findOne({
          where: { item_id: item_id, user_id: user_id, order_id: order_id },
        });
        // If no review is found, send a 404 response
        if (!review) {
          return res.status(404).send({
            message: "Review not found",
          });
        }
        // If the review is found, send a 200 response with the review data
        return res.status(200).json({
          message: "Review retrieved successfully",
          review: review,
        });
        // Log the error and send a 500 response if an exception occurs
      } catch (error) {
        console.error("Error retrieving review:", error);
        return res.status(500).send({
          message: "Internal server error",
        });
      }
    },

    //Update review by review id
    updateReview: async (req, res) => {
      // Extract the review ID from the request parameters
      const { id } = req.params;
      // Extract the new review data from the request body
      const {
        item_id,
        rating,
        comment,
        user_id,
        order_id,
        created_by,
        updated_by,
      } = req.body;
      // Find the review in the database by its ID
      const review = await db.reviews.findOne({
        where: { id: id },
      });

      // If the review exists, proceed with the update
      if (review) {
        try {
          const newReview = await review.update({
            item_id,
            rating,
            comment,
            user_id,
            order_id,
            created_by,
            updated_by,
          });
          // Send a response with the updated review
          res.status(201).json({
            message: "user updated",
            review: newReview,
          });
        }
        catch (err) {
          res.status(400).send(err);
        }
      }

    },

    // Get all reviews by user ID
    getReviewByUserId: async (req, res) => {
      // Extract user_id from the request parameters
      const { id: user_id } = req.params;

      try {
        // Find all reviews for the specified user_id
        const reviews = await db.reviews.findAll({
          where: { user_id: user_id },// Condition to find reviews by user_id
          include: [
            {
              model: db.products,
              as: 'product'
            }
          ]
        });
        // If no reviews are found, send a 404 response
        if (!reviews) {
          return res.status(404).json({ message: "reviews not found" });
        }
        // If reviews are found, send a 200 response with the reviews
        res.status(200).json(reviews);
      } catch (err) {
        // Send a 500 response indicating an internal server error
        res.status(500).json({ message: "Error fetching order details", error: err });
      }
    },
  }
};