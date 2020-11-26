const { promisify } = require('util');
const JWT = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let token;
    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({
        status: 'Error',
        data: {
          message: 'JWT token missing from request headers or invalid token ',
        },
      });
    }
    token = authorization.split(' ')[1];
    const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'Error',
      data: {
        message: 'Invalid JWT Token',
      },
    });
  }
};

module.exports = verifyUser;
