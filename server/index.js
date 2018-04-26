// starting point
// const express = require('express');
// const http = require('http');
// const app = express();

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB setup
mongoose.connect('mongodb://localhost:27017/serverAuth');

// App Setup
// .use uses middleware 
app.use(morgan('combined')); // logging used for debugging
app.use(cors()); // allows all client browsers to ajax server
app.use(bodyParser.json({ type: '*/*' })); // all requests converted to json for server
router(app);

// Server Setup before socket io
// const port = process.env.PORT || 3090;
// const server = http.createServer(app);
// server.listen(port);
// console.log('Server Listening on:', port);

// Socket io hello world message code
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3090, function(){
  console.log('listening on *:3090');
});