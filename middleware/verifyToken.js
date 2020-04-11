const jwt = require('jsonwebtoken');
const config = require('../config/devConfig.json');

const verifyToken = async (req, res, next) => {
  const url = req.originalUrl;

  try{
  if (url === '/signup' || url === '/login' || url === '/') {
    return next();
  }
  const authToken = req.header('auth-token');

  if (!authToken) { throw {status: 401, msg: 'Access Denied'}; }

  jwt.verify(authToken, config.privateKey, (err) => {
    if (err) { throw {status: 400, msg: 'Invalid Token'}; }
    return next();
  });
} catch (error){
  next(error);
}
};

module.exports = verifyToken;
