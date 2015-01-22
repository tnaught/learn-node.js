var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<!DOCTYPE html><html><head>');
    res.write('<script type="text/javascript">' +
        'function arrived(id, text) { var b = document.getElementById(id);b.innerHTML = text;}</script>')
    res.write('</head><body><div>Progressive loading');
    for(var i = 0; i < 6; i++) {
        res.write('<div id="' + i + '"></div>');
    }
    res.write('</div>');

    var down = 6;
    for(i = 0; i < 6; i++) {
        var proxyRequest = http.get({
            'host': 'localhost',
            'port': 2000,
            'path': '/?id=' + i,
            'agent': false
        }, function(proxyResonse) {
            --down;
            proxyResonse.on('data', function(chunk) {
                res.write(chunk, 'binary');
            })
            proxyResonse.on('end', function() {
                if(down == 0) {
                    res.end();
                }
            })
        });
    }

    res.write('</body></html>');
}).listen('3000');

http.createServer(function(req, res) {
    var delay = Math.round(Math.random()*2000);
    setTimeout(function() {
        var params = url.parse(req.url, true);
        var id= params.query.id;
        res.writeHead(200, {'Content-Type': 'text/html'});
        var content = '<span>Content of Module:' + id + '</span>';
        res.write('<script>' +
            'arrived("' + id+ '","' + content + '")' + '</script>');
        res.end();
    }, delay);
}).listen(2000);