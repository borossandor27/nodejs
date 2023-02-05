var http = require("http");

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    var host=request.url;
    response.end(host);
}).listen(8081);

console.log('Szerver fut a http://127.0.0.1:8081');