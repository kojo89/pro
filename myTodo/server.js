var express = require('express');
var app = express();
var message = "Hello this is node speaking";
var bodyParser = require('body-parser');
var str = "";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoList');

var Todo = null;

  //Database code

  var mySchema = mongoose.Schema({
	text: String
  });

  Todo = mongoose.model('todoModel', mySchema);

app.use(express.static('public'));
app.use(bodyParser.json());



app.get('/node/',function(req,res){
	Todo.find(function(err, ts) {
    if (err) return console.error(err);
	res.json(ts);
	//console.log(ts);
	});
});

app.post('/node/post/', function(req,res){
	var data = req.body;
	str = data.text;
	var t = new Todo({text: str, complete: "false"});
	t.save(function(err, t) {
		if (err) return console.error(err);
	});
	//send again after creating new one
	Todo.find(function(err, ts) {
		if (err) return console.error(err);
		res.json(ts);
	});
	
});

app.post('/node/post/DA/', function(req,res){
	Todo.remove({}, function(err) {
		if(err) console.log(err);
	});
	//console.log("recieved request to delete all");
});

app.get('*',function(req,res){
	res.sendFile("index.html");
});



app.listen(3000);
