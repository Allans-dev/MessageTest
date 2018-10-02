import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:3090");

// var allowedOrigins = "domain_1:* domain_2:*";
//  io(server,{origins:allowedOrigins}); 

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
} 
export { subscribeToTimer }