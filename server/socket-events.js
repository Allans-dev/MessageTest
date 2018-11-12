
module.exports = (io) => {

    io.on('connection', (socket) => {

      console.log('socket.io is connected');

      io.on('disconnect', function(){
          console.log('user disconnected');
      });

      socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          socket.emit('timer', new Date());
        }, interval);
      });

      socket.on('chat message', function(msg){
          io.emit('chat message', msg);
          console.log('message: ' + msg);
      });

      socket.on('start', function(){
        io();
      })

      socket.on('end', function (){
        socket.disconnect(0);
       });

    });

}


