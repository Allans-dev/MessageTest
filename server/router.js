const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function(app) {

    app.get('/', requireAuth, function(req, res) {
        // res.send( { message: 'super secret code is 123abc' });

        io.on('connection', function(socket){

            // check for connection
            console.log('a user connected');
            socket.on('disconnect', function(){
                console.log('user disconnected');
            });
            // message to console log
            socket.on('chat message', function(msg){
                console.log('message: ' + msg);
            });
            // message sent to everyone including sender
            socket.on('chat message', function(msg){
                io.emit('chat message', msg);
            });
        });

        io.emit('some event', { for: 'everyone' });

    });
    app.post('/signin',requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}