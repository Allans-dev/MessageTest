const app = require('express')();
const http = require('http').Server(app);

const allowedOrigins = "http://localhost:*";

const io = require('socket.io')(http,{origins:allowedOrigins});
const socketEvents = require('./socket-events');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

// DB setup
const dbUrl = 'mongodb://localhost:27017/messageTest'
mongoose.connect(process.env.MONGODB_URI || dbUrl);
// Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// App Setup
// .use uses middleware 
app.use(morgan('combined')); // logging used for debugging
app.use(cors()); // allows all client browsers to ajax server
app.use(bodyParser.json({ type: '*/*' })); // all requests converted to json for server
router(app);

const port = process.env.PORT || 3090;
// const port = process.env.PORT;

http.listen(port, "127.0.0.1"); // port then ip addresss

socketEvents(io);

console.log(`listening on: ${port}`);

