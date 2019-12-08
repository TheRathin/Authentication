const jwt = require('jsonwebtoken');
const config = require('../config/devConfig.json');

const verifyToken = (req, res, next) => {
  const url = req.originalUrl;

  if (url === '/signup' || url === '/login' || url === '/') {
    return next();
  }
  const authToken = req.header('auth-token');

  if (!authToken) { return res.status(401).send('Access Denied'); }

  return jwt.verify(authToken, config.privateKey, (err) => {
    if (err) { return res.status(400).send('Invalid Token'); }
    return next();
  });
};

module.exports = verifyToken;
