var http = require('http');
var url = require('url');
var qs = require('querystring');
/*server*/
var server = http.createServer(function(req, res) {
    var body = "<html><body>Hello World!</body></html>";
    var u = url.parse(req.url);
    var data = '';
    req.on('data', function(chunk) {
        console.log('chunk', chunk);
        data += chunk;
    })
    req.on('end', function() {
        console.log('data', qs.parse(data));
        res.writeHead(200, {
            'Content-length': body.length,
            'Content-type': 'text/html'
        })
        res.write(body);
        res.end();
    })
});

// server.listen(3001, 'localhost');
console.log('listen to port 3001');
/*client*/
var options = {
    host: 'localhost',
    port: 3001,
    method: 'POST',
    path: '/',
    headers: {}
};
options.headers['Content-type'] = 'application/x-www-form-urlencoded';
var req = http.request(options, function(res) {
    var res_data = '';
    res.on('data', function(chunk) {
        res_data += chunk;
    });
    res.on('end', function() {
        console.log('res_data', res_data);
    });
});
req.on('error', function() {
    console.log('error');
});
req.data = qs.stringify({
    a: 1,
    b: 2
});
req.write(req.data);
options.headers['Content-length'] = req.data.length;
req.end();
