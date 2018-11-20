const passport = require('passport');
const passportService = require('./services/passport');

const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// const socketEvents = require('./socket-events');

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'super secret code is 123abc' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup, () => 'signup reached router');

  // work in progress
  // app.post('/feature', requireAuth, function(req, res) {
  //     console.log(req);
  // });
};
