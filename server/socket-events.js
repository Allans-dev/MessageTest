

module.exports = (io) => {

    io.on('connection', function(socket){

        // check for connection
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        // message to console log
        socket.on('chat message', function(msg){
            console.log('message: ' + msg);
        });
        // message sent to everyone including sender
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });
    });

  io.emit('some event', { for: 'everyone' });

}
