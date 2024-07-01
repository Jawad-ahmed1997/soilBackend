const bcrypt = require("bcrypt");
const env = require("../config/env");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Sequelize } = require("sequelize");
const generateToken = require("../utils/generateToken");

module.exports = (db) => {
  return {
    // List of User
    list: (req, res) => {
      db.user
        .findAll()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log("err", err)
          res.status(400).send({ error: err.name })
        });
    },

    // Register New  User
    registerUser: async (req, res) => {
      const {
        first_name,
        last_name,
        email,
        password,
        user_type,
        created_by,
        updated_by,
      } = req.body;
      // check email 
      const user = await db.user.findOne({
        where: { email: email },
        attributes: ["email"],
      });
      // if user not found create new user
      if (!user) {
        try {
          // hash the password
          const hashedPassword = bcrypt.hashSync(password, 10);
          const newUser = await db.user.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            user_type,
            created_by,
            updated_by,
            status: "Active",
          });
          res.status(201).json({
            message: "user created",
            user: generateToken(newUser),
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        res.status(400).json({
          message: "This Email is already taken",
        });
      }

    },

    //login user
    loginUser: async (req, res) => {
      const { email, password } = req.body;
      const user = await db.user.findOne({
        where: { email: email },
      });
      if (!user) {
        res.status(401).send({
          message: "Invalid username or password",
        });
      } else {
        // compare password using bcrypt
        const match = await bcrypt.compare(password, user.password);
        delete user.password;
        if (user && match) {
          res.status(200).json({
            message: "login succesfully",
            token: generateToken(user),
          });
        } else {
          res.status(401).send({
            message: "Invalid username or password",
          });
        }
      }
    },


    //update user by id
    updateUser: async (req, res) => {
      const { id } = req.params;
      const {
        first_name,
        last_name,
      } = req.body;
      const user = await db.user.findOne({
        where: { id },
      });
      if (user) {
        try {
          const newUser = await user.update({
            first_name,
            last_name,
          });
          console.log(newUser.user_type);
          res.status(201).json({
            message: "user updated",
            token: generateToken(newUser),
          });
        }
        catch (err) {
          console.log(err);
          res.status(400).send(err);
        }
      }

    },

    //delete user by id
    deleteUser: async (req, res) => {
      const { id } = req.params;
      try {
        const user = await db.user.findOne({ where: { id: id } });
        if (!user) {
          res.status(404).send({ message: "User not found" });
        } else {
          await db.user.destroy({ where: { id: id } });
          res.status(200).send({ message: "User deleted successfully" });
        }
      } catch (err) {
        console.log("err", err);
        res.status(500).send({ error: "Error deleting user" });
      }
    },

    //forgot password
    forgotPassword: async (req, res) => {
      const { email } = req.body;

      // Find the user in the database by email
      const user = await db.user.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }
      // Generate a random token for password reset  
      const token = crypto.randomBytes(20).toString('hex');
      await db.user.update(
        { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 },
        { where: { email: email } }
      );

      // Construct the password reset link
      const resetPasswordLink = `${env.RESET_PASSWORD_URL}?token=${token}`;

      // Configure the email transporter using nodemailer
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: env.EMAIL_ADDRESS,
          pass: env.EMAIL_PASSWORD,
        },
      });

      // Set up the email options
      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_ADDRESS,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `${resetPasswordLink}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };

      // Send the email
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('There was an error: ', err);
          return res.status(500).send({ message: 'Error sending email' });
        }
        res.status(200).send({ message: 'Recovery email sent' });
      });
    },
    // Reset Password
    resetPassword: async (req, res) => {
      const { token } = req.params;
      const { password } = req.body;
      console.log("token and password ", token, password);

      // Find the user with the provided reset token and ensure the token hasn't expired
      const user = await db.user.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { [Sequelize.Op.gt]: Date.now() } // Ensure the token hasn't expired
        }
      });

      if (!user) {
        // If no user is found or the token is invalid/expired, send a 400 response
        return res.status(400).send({ message: 'Password reset token is invalid or has expired' });
      }
      // Hash the new password using bcrypt
      const hashedPassword = bcrypt.hashSync(password, 10);
      // Update the user's password and clear the reset token and expiration
      await db.user.update(
        {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null
        },
        { where: { id: user.id } }
      );
      // Send a response indicating the password has been reset
      res.status(200).send({ message: 'Password has been reset' });
    }


  };
};