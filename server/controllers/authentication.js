const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    // User has already had their email and password auth'd
    // need to give candidate a token

    res.send({ token: tokenForUser(req.user) });
}


exports.signup = function(req, res, next) {
        // res.send({ success: 'true' }); 
        console.log('server signup function called');

        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            res.status(422).send({ error: 'You must provide email and password' });
        }

        // see if a user with the given email exists
        User.findOne({ email: email }, ( err, existingUser ) => {
            if (err) { return next(err); }

            // if it does exists return an error
            if (existingUser) {
                return res.status(422).send({ error: 'Email is in use' });
            }

            // if an email does NOT exist, create and save user record
            const user = new User({ 
                email: email,
                password: password
            });

            user.save((err) => {
                if (err) { return next(err); }
            });


            // respond to req indicating user was created
            res.json({ token: tokenForUser(user) });
        });

    }

   