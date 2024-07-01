const bcrypt = require("bcrypt");
const env = require("../config/env");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Sequelize } = require("sequelize");



module.exports = (db) => {
    return {
      // List of Categories
      list: (req, res) => {
        db.categories
          .findAll()
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((err) =>{
            console.log("err",err)
            res.status(400).send({ error: err.name })
          } );
      },

      // Create a New category
      createCategory: async (req, res) => {
          const {
            name,
            description,
            created_by,
            updated_by,
          } = req.body;
            try {

              const newCategory = await db.categories.create({
                name,
                description,
                created_by,
                updated_by,
              });
              res.status(201).json({
                message: "Category created",
                category: newCategory,
              });
            } catch (err) {
              console.log(err);
            }  
     
      },
    };
  };