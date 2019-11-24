const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const config = require('./config/devConfig.json');

// Connect to database
const mongoose = require('mongoose');
mongoose.connect(config.dbConn, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('Connected to db');
})

// Middelware
app.use(bodyParser.json());

// Import Routes
const authRoute = require('./routes/auth');

// Use routes as middleware
app.use(authRoute);

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to Node js Authentication Microservice');
});
