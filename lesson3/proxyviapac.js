var http = require('http');
var PacProxyAgent = require('pac-proxy-agent');
var url = require('url');

var proxy = 'pac+https://www.pandafan.org/pac/e2fba2e3.pac';
var agent = new PacProxyAgent(proxy);
var opts = url.parse("http://google.com");
opts.agent = agent;

console.log(opts);
http.get(opts, function(res) {
    res.pipe(process.stdout);
})
.on('error', function() {
    console.log(arguments);
});