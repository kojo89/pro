var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoList');

var Todo = null;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection:error'));
//db.once('open', function(callback) {

  //Database code

  var mySchema = mongoose.Schema({
	text: String
  });

  Todo = mongoose.model('todoModel', mySchema);

  //var barry = new Person({name : 'Barry' });
  
  //barry.save(function(err, barry) {
    //if (err) return console.error(err);
  //});
  
  //Person.find(function(err, persons) {
    //if (err) return console.error(err);
    //console.log(persons);
  //});