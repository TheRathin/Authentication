const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const config = require('../config/devConfig.json');
const joi = require('@hapi/joi');

const userJoiSchema = {
    email: joi.string().min(6).required().email(),
    password: joi.string().required.min(8).required()
}
authRouter.post('/signup', async(req, res) => {

    const valUserCred = joi.valdate(req.body, userJoiSchema);

    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    //const token = jwt.sign(newUser, config.privateKey, { expiresIn: config.expiresIn, algorithm: config.algorithm });
    //console.log(token)
    try{
        const saveUser = await newUser.save();
        res.send('User sign uped!')
    }catch(err){
        console.log(err);
    }
});

authRouter.post('/login', (req, res) => {

});

module.exports = authRouter;
