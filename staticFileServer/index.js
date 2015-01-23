var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('./mime');

var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var realPath = 'assets' + pathname;
    console.log('realPath', realPath);
    fs.exists(realPath, function(exists) {
        console.log('exists', exists);
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1): '';
        var contentType = mime[ext] || 'text/plain';

        console.log(path.extname(realPath), ext, contentType)
        if(!exists) {
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.write('This request URL' + pathname + 'not found on this server');
            res.end();
        }
        else {
            fs.readFile(realPath, 'binary', function(err, file) {
                if(err) {
                    console.log(err);
                    res.writeHead(500, {'Content-type': 'text/plain'});
                    res.end('err');
                }
                else {
                    res.writeHead(200, {'Content-type': contentType});
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