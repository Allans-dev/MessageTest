const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const config = require('../config');
const User = require('../models/user');

// create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify email and password, call done
  // otherwise call done with false
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    // compare passwords - login password and db password
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

// setup option for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.secret || config.secret,
};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // payload decoded jwt token
  // See if the user id in the payload exists in the database if it is call done
  // otherwise call done without user object
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
