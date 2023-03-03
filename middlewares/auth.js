const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try{
    const secretKey = process.env.SECRET_KEY;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secretKey);
    
    if (!decoded) {
      throw new Error('INVALID_USER');
    }

    req.user =decoded.userId;

    return next();
  } catch (err) {
    res.status(400).json({ message: 'INVALID_ACCESS_TOKEN'});
  }
};

module.exports = {
  validateToken
};