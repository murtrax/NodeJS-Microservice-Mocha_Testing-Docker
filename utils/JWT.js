const JWT = require('jsonwebtoken');

const tokenService = {};

tokenService.signToken = (payload) => {
  return JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = tokenService;
