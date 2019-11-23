const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;


// Middelware
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});

app.get('./', (req, res) => {
  res.send('Welcome to Node js Authentication Microservice');
});
