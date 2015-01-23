var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
    console.log(url.parse(req.url, true).query);
});

server.listen(3000, function() {
    console.log('listen to port 3000');
});