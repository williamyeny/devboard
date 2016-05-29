var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/play', function(req, res, next) {
});

app.get('/game/:id', function(req, res) {
});


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var http = require('http').createServer(app);  
var io = require('socket.io')(http);

io.on('connection', function(client) {
  console.log('Client connected...');
  
  client.on('chat', function(data) {
    io.emit('chat', {text:data.text, name:data.name});
  });
  
  client.on('down', function(data) {
    console.log(data);
    io.emit('down', {id:client.id, mode:data.mode, color:data.color});
  });
  
  client.on('up', function() {
    io.emit('up', client.id);
  });
   
  client.on('drag', function(data) {
    io.emit('drag', {id:client.id,point:data});
  });
  
  
  client.on('disconnect', function(data) {
    
  });

});

http.listen(3000); 
console.log('Listening...');