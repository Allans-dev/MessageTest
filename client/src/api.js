import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:3090");

// var allowedOrigins = "domain_1:* domain_2:*";
//  io(server,{origins:allowedOrigins}); 

function subscribeToTimer(cb) {
    socket.on('connection', console.log(timestamp => cb(null, timestamp)));
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
} 

export { subscribeToTimer };

function messageRelay(msg) {
    socket.emit('chat message', msg, (confirmation)=>{
        console.log(confirmation);
        socket.on('chat message', console.log(msg));
    });
}

export { messageRelay };

function messageDisplay(msg) {
    socket.on('chat message', function(msg){

        console.log('receiving emmitted event from server');
        
        let node = document.createElement("LI");
        let textnode = document.createTextNode(msg);
        node.appendChild(textnode);
        // this.parentNode.appendChild(node);
        document.getElementById('messages').appendChild(node);
    });
}

export { messageDisplay };

