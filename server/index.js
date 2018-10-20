const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketEvents = require('./socket-events');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

// DB setup
const dbUrl = 'mongodb://localhost:27017/messageTest'
mongoose.connect(dbUrl, (err)=>{
    console.log(err);
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// App Setup
// .use uses middleware 
app.use(morgan('combined')); // logging used for debugging
app.use(cors()); // allows all client browsers to ajax server
app.use(bodyParser.json({ type: '*/*' })); // all requests converted to json for server
router(app);

// Socket io hello world message code
// app.get('/', function(req, res){
//   // res.sendFile(__dirname + '/../client/src/components/messageDisplay.js');
//   res.sendFile(__dirname + '/../client/index.html');
// });

// http.listen(3090, function(){
//   console.log('listening on *:3090');
// });

const port = process.env.PORT || 3090;

socketEvents(io);
io.listen(port);
