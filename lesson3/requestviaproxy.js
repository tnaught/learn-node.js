var request = require('request');

request({
    url: 'http://google.com',
    proxy: 'http://q.gfw.li:36105'
}, function(error, reponse, body) {
    if(!error && reponse.statusCode == 200) {
        console.log(body);
    }
    console.log(error)
});