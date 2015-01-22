var http = require('http');

var options = {
    protocol: 'http:',
    slashes: true,
    host: 'google.com',
    port: null,
    path: '/',
    href: 'http://google.com',
    agent: {
        uri: 'https://www.pandafan.org/pac/e2fba2e3.pac'
    }
}

http.get(options, function(res) {
    res.pipe(process.stdout);
})
.on('error', function() {
    console.log(arguments);
});