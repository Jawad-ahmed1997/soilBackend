"use strict";
require('dotenv').config()
const env = {
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
  EMAIL_ADDRESS:process.env.EMAIL_ADDRESS,
  EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
  RESET_PASSWORD_URL:process.env.RESET_PASSWORD_URL
};

module.exports = env;
