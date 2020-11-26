const JWT = require('../utils/JWT');

exports.login = (req, res) => {
  try {
    const { username, password } = req.body;
    const token = JWT.signToken({ username, password });
    return res.status(200).json({
      status: 'success',
      data: {
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'error',
      data: {
        message: 'Something went wrong',
      },
    });
  }
};
