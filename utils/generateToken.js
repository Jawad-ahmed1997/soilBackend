const jwt = require("jsonwebtoken");

const generateToken = (obj) => {
  const payload =obj.toJSON()
  return jwt.sign(payload, "absd", {
    expiresIn: "12h",
  });
};

module.exports = generateToken;
