

module.exports = (io) => {

    io.on('connection', (client) => {

      console.log('socket.io is connected');

      client.on('disconnect', function(){
          console.log('user disconnected');
      });

      client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
      });

      client.on('chat message', function(msg){
          client.emit('chat message', msg);
          console.log('message: ' + msg);
      });

    });

}


