module.exports = function (io) {

  io.sockets.on('connection', function(socket){
    console.log('Socket connected');
    socket.on('finish', function(data){
      console.log(data);
      console.log('finish:topic');
    });
/*
    // Socket event for gist updated
    socket.on('gistUpdated', function(gistUpdated){
      io.emit('gistUpdated', gistUpdated);
    });*/
  });
};