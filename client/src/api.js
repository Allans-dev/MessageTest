import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3090');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

export { subscribeToTimer };

function messageRelay(msg) {
  socket.emit('chat message', msg, (confirmation) => {
    // eslint-disable-next-line no-console
    console.log(confirmation);
    // eslint-disable-next-line no-console
    socket.on('chat message', console.log(msg));
  });
}

export { messageRelay };

function messageDisplay() {
  // socket.on('connection', console.log('client socket ready'));
  socket.on('chat display', ({ msg }) => {
    // eslint-disable-next-line no-console
    console.log('receiving emmitted event from server');
    // eslint-disable-next-line no-undef
    const node = document.createElement('LI');
    // eslint-disable-next-line no-undef
    const textnode = document.createTextNode(msg);
    node.appendChild(textnode);
    // this.parentNode.appendChild(node);
    // eslint-disable-next-line no-undef
    document.getElementById('messages').appendChild(node);
  });
}

export { messageDisplay };

function toggleSocket(toggle) {
  return toggle === 'connect' ? socket.emit('start') : socket.emit('end');
}

export { toggleSocket };
