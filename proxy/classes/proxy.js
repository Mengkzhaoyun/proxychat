var httpProxy = require('http-proxy');

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
  //在这里设置Header
  proxyReq.setHeader('X-Special-Proxy-Header', 'cig');

  //处理url,将/projectA/rest/querytable中的首个目录/projectA/移除
  var requrl = proxyReq.path.substr(0, proxyReq.path.indexOf("/", 1) + 1);
  proxyReq.path = proxyReq.path.substr(requrl.length - 1, proxyReq.path.length);
});

// 
// Listen for the `close` event on `proxy`. 
// 
proxy.on('close', function (res, socket, head) {
  // view disconnected websocket connections 
  console.log('Client disconnected');
});

var cigProxy = function () { }

cigProxy.web = function (req, res) {
  if (req.url.replace(/[^/]/g, '').length == 1) {
    res.writeHead(302, { "connection": "Keep-Alive", "Location": req.url + "/", "host": req.headers.host });
    res.end("<h1>redirect</h1>");
  }
  else {
    var appName = req.url.substr(0, req.url.indexOf("/", 1) + 1).toLowerCase();
  }
}

module.exports = cigProxy;