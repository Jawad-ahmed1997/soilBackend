const bcrypt = require("bcrypt");
const env = require("../config/env");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Sequelize } = require("sequelize");
const generateToken = require("../utils/generateToken");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/product");
  },
  filename: function (req, file, cb) {
    file.originalname = `exp${new Date().getTime()}_${file.originalname}`;
    cb(null, file.originalname);
  },
});
module.exports = (db) => {
  return {
    // Retrieve a list of products along with their categories
    list: (req, res) => {
      // Retrieve all products from the database
      db.products.findAll({
        include: [{
          model: db.categories,
          as: 'Category',  // Alias for the 'categories' table in the query
          attributes: ['id', 'name'] // Select only the 'id' and 'name' fields from the categoryy
        }]
      })
        .then((result) => {
          // Send a 200 response with the list of products and their categories
          res.status(200).send(result);
        })
        .catch((err) => {
          // Send a 400 response with the error details
          res.status(400).send({ error: err.name });
        });
    },
    // Create a New product
    createProduct: async (req, res) => {
      // Handle file upload using multer
      const upload = multer({ storage }).single("image");
      // Upload file and process request
      upload(req, res, async (err) => {
        // Extract product data from the request body
        const {
          name,
          description,
          cat_id,
          price,
          rating,
          created_by,
          updated_by,
        } = req.body;
        try {
          // Check if file is uploaded successfully
          if (req?.file) {
            // Retrieve original filename of the uploaded image
            const product = req.file.originalname;
            // Set the image path for the product
            req.body["image"] = "/product/" + product;
          }

          // Create a new product in the database
          const newProduct = await db.products.create({
            name,           // Product name
            description,    // Product description
            price,          // Product price
            rating,         // Product rating
            cat_id,         // Category ID associated with the product
            image: req.body.image, // Image path for the product
            created_by,     // ID of the user who created the product
            updated_by,     // ID of the user who last updated the product
          });
          // Send a 201 response with the created product
          res.status(201).json({
            message: "product created",
            product: newProduct,
          });
        } catch (err) {


          // Send a 500 response indicating an internal server error
          res.status(500).json({
            message: "Error creating product", // Error message
            error: err,                        // Include the error details
          });
        }
      });
    },
  };
};