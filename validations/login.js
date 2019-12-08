const Joi = require('@hapi/joi');

const signupValidation = (data) => {
  const Schema = Joi.object().keys({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(8).required(),
  }).with('email', 'password');
  return Schema.validate(data);
};

module.exports.signupValidation = signupValidation;
