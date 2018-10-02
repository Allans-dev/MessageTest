

module.exports = (io) => {

    io.on('connection', (client) => {

      console.log('socket.io is connected');

      io.on('disconnect', function(){
          console.log('user disconnected');
      });

      client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
      });

      io.on('chat message', function(msg){
          console.log('message: ' + msg);
      });

      io.on('chat message', function(msg){
          io.emit('chat message', msg);
      });

    });
    
    
    // io.on('connection', function(socket){

    //     // check for connection
    //     console.log('a user connected');

    //     socket.on('disconnect', function(){
    //         console.log('user disconnected');
    //     });
    //     // message to console log
    //     socket.on('chat message', function(msg){
    //         console.log('message: ' + msg);
    //     });
    //     // message sent to everyone including sender
    //     socket.on('chat message', function(msg){
    //         io.emit('chat message', msg);
    //     });
    // });

//   io.emit('some event', { for: 'everyone' });

//   io.on('chat message', function(msg){
//     console.log(msg);
//     io.emit('chat message', msg);
// });
}


