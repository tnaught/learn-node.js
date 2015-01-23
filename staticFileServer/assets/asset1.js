var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var realPath = 'assets' + pathname;
    path.exists(realPath, function(exists) {
        if(!exists) {
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.write('This request URL' + pathname + 'not found on this server');
            res.end();
        }
        else {
            fs.readFile(realPath, 'binary', function(err, file) {
                if(err) {
                    res.writeHead(500, {'Content-type': 'text/plain'});
                    res.end(err);
                }
                else {
                    res.writeHead(200, {'Content-type': 'text/html'});
                    res.write(file, 'binary');
                    res.end();
                }
            })
        }
    })
});
server.listen(3000, function() {
    console.log('listen to port 3000');
});