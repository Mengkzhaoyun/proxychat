/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var swig = require('swig');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'tpl');
app.engine('tpl', swig.renderFile);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

// development only
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

var serve = http.createServer(app);
var io = require('socket.io')(serve);

serve.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.emit('chat', 'welcome to port:3001');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('chat', function (msg) {
    console.log("chat message inserted into db: " + msg);
    socket.broadcast.emit('chat', msg);
  });
});
