const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../model/User');
const config = require('../config/devConfig.json');
const { signupValidation } = require('../validations/login');

authRouter.post('/signup', async (req, res) => {

  const userCred = {
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = signupValidation(userCred);

  if (error) { return res.status(400).send(error.details); }

  const isEmailTaken = await User.findOne({ email: userCred.email });

  if (isEmailTaken) { return res.status(400).send('Email already being used'); }

  const hashedPass = bcryptjs.hashSync(userCred.password, 10, (err, newPass) => {
    if (err) { return res.status(500).send('Could not register user, please try again'); }
    return newPass;
  });

  const newUser = new User({ email: userCred.email, password: hashedPass });
  const { code, msg } = await newUser.save()
    .then(() => ({ code: '200', msg: 'User signuped!' }))
    .catch(() => ({ code: '500', msg: 'Could not register user' }));

  return res.status(code).send(msg);
});

authRouter.post('/login', async (req, res) => {
  const userCred = {
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = signupValidation(userCred);

  if (error) { return res.status(400).send(error.details); }

  const regUser = await User.findOne({ email: userCred.email });

  if (!regUser) { return res.status(400).send('Invalid email'); }

  const valPass = await bcryptjs.compare(userCred.password, regUser.password);

  if (!valPass) { return res.status(400).send('Invalid Password'); }

  // eslint-disable-next-line max-len
  const jwtToken = jwt.sign({ _id: regUser._id, ...userCred }, config.privateKey, { expiresIn: config.expiresIn, algorithm: config.algorithm });

  return res.status(200).header('auth-token', jwtToken).send('Successful Login');
});

module.exports = authRouter;
