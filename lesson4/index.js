var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');

var app = express();
var ep = new eventproxy();
var total = 20;

app.get('/', function(req, res, next) {
    superagent.get('https://cnodejs.org')
    .end(function(err, sres) {
        if(err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function(index, topic) {
            if(index < total) {
                items.push({
                    title: $(topic).attr('title'),
                    href: $(topic).attr('href')
                });
            }
        });
        console.log('items', items);
        ep.after('topic_html', items.length, function(topics) {
            topics = topics.map(function(topic) {
                var $detail = cheerio.load(topic[1]);
                return {
                    url: topic[0],
                    author: $detail('.user_name').html(),
                    title: $detail('.topic_full_title').html()
                }
            });
            res.send(topics);
        });
        // for (var i = 0; i < items.length; i++) {
        //     var topicUrl = items[i].href;
        //     console.log(i);
        //     //因为请求是异步的，所有topicUrl的值统一为最后一个url
        //     superagent.get('https://cnodejs.org' + topicUrl)
        //     .end(function(cerr, cres) {
        //         console.log('success', i);
        //         ep.emit('topic_html', [topicUrl, cres.text]);
        //     });
        // };
        items.forEach(function(topicUrl) {
            //连续打印出来
            console.log(topicUrl.href);
            superagent.get('https://cnodejs.org' + topicUrl.href)
            .end(function(cerr, cres) {
                //为什么这里可以取到正确的topicUrl呢
                console.log('success', topicUrl.href);
                ep.emit('topic_html', [topicUrl.href, cres.text]);
            });
        });
    })
})
.listen(3000, function() {
    console.log('listen port 3000');
})