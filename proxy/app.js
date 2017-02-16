var http = require('http');
var urlfolder = require('./classes/urlfolder');
var proxy = require('./classes/proxy');
var local = require('./classes/local');

function beginRequest(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  res.on('close', endRequest);

  var appName = urlfolder.getAppName(req.url);
  if (appName == "" ||appName == "static" || urlfolder.isLocalPath(appName)) {
    local.web(req, res);
  }
  else {
    proxy.web(req, res);
  }
}

function endRequest(req, res) {

}

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(beginRequest);

server.on('upgrade', function (req, socket, head) {
  //proxy.ws(req, socket, head);
});

console.log("listening on port 5050")
server.listen(5050);