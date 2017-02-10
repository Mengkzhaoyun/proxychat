var http = require('http'),
  httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Errors can be listened on either using the Event Emitter API
//
proxy.on('error', function (e) {

});

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on('proxyReq', function (proxyReq, req, res, options) {
  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
  if (proxyReq.path.toLowerCase().startsWith("/rest")) {
    proxyReq.path = proxyReq.path.substr("/rest".length, proxyReq.path.length);
  }
  else if (proxyReq.path.toLowerCase().startsWith("/chat")) {
    proxyReq.path = proxyReq.path.substr("/chat".length, proxyReq.path.length);
  }
  else {
    //..
  }
});



//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function (req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  if (req.url.toLowerCase().startsWith("/rest")) {
    proxy.web(req, res, { target: 'http://127.0.0.1:3000' });
  }
  else if (req.url.toLowerCase().startsWith("/chat")) {
    proxy.web(req, res, {
      target: {
        host: 'localhost',
        port: 3001
      }, ws: true
    });
  }
  else {
    proxy.web(req, res, { target: {
        host: 'localhost',
        port: 3001
      }, ws: true });
  }
});

server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

console.log("listening on port 5050")
server.listen(5050);