var async = require('async');

var concurrencycount = 0;
var fetchUrl = function(url, callback) {
    var delay = parseInt(Math.random()*10000000%2000, 10);
    concurrencycount++;
    console.log('url:', url, ',concurrency:', concurrencycount, ',time span:', delay);
    setTimeout(function() {
        concurrencycount--;
        callback(null, url + ' html content');
    }, delay);
};

var urls = [];
for(var i = 0;i < 30;i++) {
    urls.push('http://data-source'+ i);
}

async.mapLimit(urls, 5, function(url, callback) {
    fetchUrl(url, callback);
}, function(err, result) {
    console.log('final', result);
})