var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var zlib = require('zlib');
var mime = require('./mime');
var config = require('./config');

var server = http.createServer(function(req, res) {
    console.log('server');
    var pathname = url.parse(req.url).pathname;
    var realPath = 'assets' + pathname;
    fs.exists(realPath, function(exists) {
        if(!exists) {
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.write('This request URL' + pathname + 'not found on this server');
            res.end();
        }
        else {
            var ext = path.extname(realPath);
            ext = ext ? ext.slice(1): '';
            var contentType = mime[ext] || 'text/plain';
            
            res.setHeader('Content-type', contentType);
            fs.stat(realPath, function(err, stas) {
                var lastModified = stas.mtime.toUTCString();
                var ifModifiedSince = 'If-Modified-Since'.toLowerCase();
                res.setHeader('Last-Modified', lastModified);
                
                if(ext.match(config.Expires.fileMatch)) {
                    var expires = new Date();
                    expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
                    res.setHeader('Expires', expires);
                    res.setHeader('Cache-Control', 'max-age=' + config.Expires.maxAge);
                }

                if(req.headers[ifModifiedSince] && lastModified == req.headers[ifModifiedSince]) {
                    res.writeHead(304, 'Not Modified');
                    res.end();
                }
                else {
                    console.log('readFile');
                    var raw = fs.createReadStream(realPath);
                    var acceptEncoding = req.headers['accept-encoding'] || '';
                    var matched = ext.match(config.Compress.match);

                    if(matched && acceptEncoding.match(/\bgzip\b/)) {
                        res.writeHead(200, 'OK', {
                            'Content-Encoding': 'gzip'
                        });
                        raw.pipe(zlib.createGzip()).pipe(res);
                    }
                    else if(matched && acceptEncoding.match(/\bdeflate\b/)) {
                        res.writeHead(200, 'OK', {
                            'Content-Encoding': 'deflate'
                        });
                        raw.pipe(zlib.createDeflate()).pipe(res);
                    }
                    else {
                        res.writeHead(200, 'OK');
                        raw.pipe(res);
                    }
                }
            });
        }
    })
});
server.listen(3000, function() {
    console.log('listen to port 3000');
});