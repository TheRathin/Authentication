const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;
const config = require('./config/devConfig.json');

// const token = jwt.sign({ username: 'rathin' }, Buffer.from(config.privateKey, 'ASCII', 'UTF-8'), { expiresIn: config.expiresIn, algorithm: config.algorithm });
// console.log(token)
// Middelware

// Import Routes

app.use(bodyParser.json());

// Use routes as middleware

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});

app.get('./', (req, res) => {
  res.send('Welcome to Node js Authentication Microservice');
});
