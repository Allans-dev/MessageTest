const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// const socketEvents = require('./socket-events');

module.exports = function(app) {

    app.get('/', requireAuth, function(req, res) {
        // res.send( { message: 'super secret code is 123abc' });
    });
    app.post('/signin',requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup, ()=>"signup reached router");

    // work in progress
    // app.post('/feature', requireAuth, function(req, res) {
    //     console.log(req);
        
    // });
}