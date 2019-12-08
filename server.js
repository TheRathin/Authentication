const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const config = require('./config/devConfig.json');
const verifyToken = require('./middleware/verifyToken');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
mongoose.connect(config.dbConn, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to db');
});

// Middelware
app.use(bodyParser.json());
app.use(verifyToken);
// always put error handler middleware in the end
app.use(errorHandler);

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
