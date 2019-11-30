const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const config = require('../config/devConfig.json');
const {signupValidation} = require('../validations/login');
const bcryptjs = require('bcryptjs');

authRouter.post('/signup', async (req, res) => {

    const userCred = {
        email: req.body.email,
        password: req.body.password,
    };

    const {error} = signupValidation(userCred);
    
    if(error){ return res.status(400).send(error.details); }

    const isEmailTaken = await User.findOne({email: userCred.email});
    
    if(isEmailTaken) { return res.status(400).send('Email already being used'); }

    const hashedPass = bcryptjs.hashSync( userCred.password, 10, (err, res) => {
        if(err) { return res.status(500).send('Could not register user, please try again'); }
        return res;
    })
 
    const newUser = new User({email: userCred.email, password: hashedPass});
    const {code , msg} = await newUser.save()
    .then( res => { return ({ code: '200', msg: 'User signuped!' }); })
    .catch( err => {return ({ code: '500', msg: 'Could not register user' }); })

    res.status(code).send(msg);
});

authRouter.post('/login', (req, res) => {

});

module.exports = authRouter;
