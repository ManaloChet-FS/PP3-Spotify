const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (id) => {
  return jwt.sign({id}, SECRET_KEY, {
    expiresIn: '1hr'
  });
};

const verifyToken = async (token) => {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  generateToken,
  verifyToken
}