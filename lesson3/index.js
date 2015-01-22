var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();
app.get('/', function(req, res, next) {
    superagent.get('http://www.xiami.com/', function(error, sres) {
        if(error) {
            return next(error);
        }
        console.log(sres.text);
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function(i, element) {
            if(i < 10) {
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                })
            }
        });
        res.send(items);
    })
});
app.listen(3000, function() {
    console.log('listen to port: 3000');
});