var http = require('http');
var url = require('url');
/*proxy*/
var server = http.createServer(function(req, res) {
    var url_parts = url.parse(req.url);
    console.log('url', url_parts);
    var opts = {
        host: 'google.com',
        port: 80,
        path: url_parts.pathname,
        method: url_parts.method || 'GET',
        headers: req.headers
    };
    console.log(opts);
    var creq = http.request(opts, function(cres) {
        console.log('cres');
        res.writeHead(cres.statusCode, cres.headers);
        cres.pipe(res);
    });
    req.on('error', function() {
        console.log('cres error', arguments);
    });
    req.pipe(creq);
});
server.listen(3000, 'localhost');