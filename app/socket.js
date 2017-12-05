var meetingDAO = require('./services/meetingServices').meetingDAO;
var meetings = new meetingDAO();
var meetingModel = require('./models/meeting');

module.exports = function (io) {

  io.sockets.on('connection', function(socket){
    console.log('Socket connected');
    socket.on('finish:topic', function(data){
      console.log(data);
      meetings.connect(function(conn_result){
          meetings.updateMeeting(meetingModel, data.query, data.newData, function(err, meeting){
              if (err) {
                  console.log('Error updating meeting: ', err);
              } else {
              }
          });
      });
      io.sockets.emit('topics:updated', {});
    });
  });
/*
    // Socket event for gist updated
    socket.on('gistUpdated', function(gistUpdated){
      io.emit('gistUpdated', gistUpdated);
    });*/
      
};