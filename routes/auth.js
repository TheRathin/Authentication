const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../model/User');
const config = require('../config/devConfig.json');
const { signupValidation } = require('../validations/login');

authRouter.post('/signup', async (req, res, next) => {

  const userCred = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const { error } = signupValidation(userCred);

    if (error) { throw (error.details[0].message); }

    const isEmailTaken = await User.findOne({ email: userCred.email });

    if (isEmailTaken) { throw ('Email is already being used'); }

    const hashedPass = bcryptjs.hashSync(userCred.password, 10, (err, newPass) => {
      if (err) { throw ('Could not register user, please try again'); }
      return newPass;
    });

    const newUser = new User({ email: userCred.email, password: hashedPass });

    const { code, msg } = await newUser.save()
      .then(() => ({ code: '200', msg: 'User signuped!' }))
      .catch(() => { throw ('Could not register user'); });

    return res.status(code).send(msg);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (req, res,next) => {
  const userCred = {
    email: req.body.email,
    password: req.body.password,
  };

  try {

  const regUser = await User.findOne({ email: userCred.email });

  if (!regUser) { throw ('Invalid email'); }

  const valPass = await bcryptjs.compare(userCred.password, regUser.password);

  if (!valPass) { throw ('Invalid Password'); }

  // eslint-disable-next-line max-len
  const jwtToken = jwt.sign({ _id: regUser._id, ...userCred }, config.privateKey, { expiresIn: config.expiresIn, algorithm: config.algorithm });
  return res.status(200).header('auth-token', jwtToken).send('Successful Login');  
}catch (error){
  next(error);
  }
});

module.exports = authRouter;
