var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/messages');

var Message = null;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection:error'));
db.once('open', function(callback) {
	//Database code

  var mySchema = mongoose.Schema({
	nam: String,
	messag: String
  });

  Message = mongoose.model('message', mySchema);
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.get('/data', function(req, res){
  res.sendfile('public/data.html');
});

io.on('connection', function(socket){
	Message.find(function(err, msgs) {
		if (err) return console.error(err);
			socket.broadcast.emit('chatt history', msgs);
			socket.emit("chatt history", msgs);
		});
    socket.on('chat message', function(msg){
    message = msg.message;
    name = msg.name;
    longs = name+" said: "+message
	var message2 = new Message({nam : name, messag : message });
  
  message2.save(function(err, message) {
    if (err) return console.error(err);
  });
	
    socket.broadcast.emit('chatt message', longs);
    socket.emit("chatt message", longs);
  });
  
  socket.on("clear", function(err){
	if (err) return console.error(err);
	Message.remove({}, function(err) {
		console.log("removed");
	});
  });
});


http.listen(80);
