const app = require('express')();
// const http = require('http').Server(app);
const io = require('socket.io')();
const socketEvents = require('./socket-events');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

// DB setup
mongoose.connect('mongodb://localhost:27017/serverAuth');
// P.N move to mlabs

// App Setup
// .use uses middleware 
app.use(morgan('combined')); // logging used for debugging
app.use(cors()); // allows all client browsers to ajax server
app.use(bodyParser.json({ type: '*/*' })); // all requests converted to json for server
router(app);

// Socket io hello world message code
app.get('/', function(req, res){
  // res.sendFile(__dirname + '/../client/src/components/messageDisplay.js');
  res.sendFile(__dirname + '/../client/index.html');
});

// http.listen(3090, function(){
//   console.log('listening on *:3090');
// });

socketEvents(io);

const port = 3090;

io.listen(port);
console.log('listening on port ', port);