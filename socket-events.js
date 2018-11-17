
module.exports = (io) => {

  io.on('connection', (socket) => {

    console.log('socket.io is connected');

    io.on('disconnect', function() {
      console.log('user disconnected');
    });

      socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          socket.emit('timer', new Date());
        }, interval);
      });

    socket.on('chat message', (msg) => {
      io.emit('chat display', msg);
      console.log(`message:  + ${msg}`);
    });

      socket.on('end', function (){
        console.log('server receives request to end');
        socket.disconnect(0);
       });

    });

    io.on('start', function(){
      console.log('server receives request to start'); 
      io();
    })
}
