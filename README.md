##target
node-lessons from [alsotang](https://github.com/alsotang/node-lessons)
##time period
2015/1/21-2015/1/29,two lessons for one day
##output
nodejs folder
##every record
####2015/1/21
**lesson0:**

- *target:* 
    准备环境：安装nvm--node version manage，安装node.js
- *problem:*
    window7系统下没有curl命令，直接安装的支持window的node.js 

**lesson1:**

- *target:*
    使用express框架生成一个web服务器，显示hello world的页面
- *main:*
    1.   安装express: npm install express -g，-g参数表示安装在全局，也可以选择安装在当前项目中。
    2.   使用express生成web服务器: 
    
    ```
    var express = require('express');
    var app = express();
    app.get('/', function(req, res) {
        res.send('Hello world!');
    })
    app.listen(3000);
    ```

- *extension:*使用node.js的自带的http模块进行服务端的开发和客户端的开发

    ```
    var http = require('http');
    var server = http.createServer(function(req, res) {
        var body = '<html><head></head><body>Hello World!</body></html>';
        res.writeHead(200, {
            'Content-type': 'text/html',
            'Content-lenght': body.length
        })
        res.write(body);
        res.end();
    });
    server.listen(3000);
    ```

- *reference:*
    [nodejs api中的http部分](http://nodejs.org/api/http.html#http_http_request_options_callback)
    [http://book.mixu.net/node/ch10.html](http://book.mixu.net/node/ch10.html)
- *output:*
    ./lesson1/hello_world_express.js,
    ./lesson1/hello_world_node.js,
    ./lesson1/proxy.js,
    ./lesson1/README.md
    node_http.xmind

####2015/1/22

**lesson2:**

- *target:*
    获取GET请求的查询参数，使用utility模块生成md5
- *main:*
    express获取请求参数：

    ```
    app.get('/', function(req, res) {
        var query = req.query;
    })
    ```

    http和url获取请求参数:

    ```
    http.createServer(function(req, res) {
        var query = url.parse(req.url, true).query;
    })
    ```

    生成md5

    ```
    var utility = require('utility');
    var md5 = uritlity.md5(sth);
    ```

- *extension:* utility模块的源码组织方式
    入口文件: index.js

    ```
    module.exports = require('./lib/utility');
    ```

    主文件: ./lib/utility.js,使用copy-to模块来合并各子文件

    ```
    copy(require(''))
    .and(require(''))
    ...
    .to(module.exports);
    ```

    各子文件的结构：array/crypto/date/functin/map/number/optimize/polyfill/string/web

    ```
    exports.fun1 = function() {
        return re;
    }
    //or 
    module.exports = {
        'fun1': function() {
            
        }
    }
    ```

**lesson3:**

- *target:*
    简单的爬虫程序
- *main:*
    使用的外部module有: express,superagent,cheerio
    主要实现:

    ```
    app.get('/', function(req, res, next) {
        //superagent是请求代理模块，可以方便的做客户端请求的处理，可链式调用，如:superagent.get(url).set(property,value).end(function(res) {})
        superagent.get('https://cnodejs.org/', function(err, cres) {
            if(err) {
                return next(err);
            }
            //cheerio是一个jquery在server端的实现，方便获取网页的信息
            var $ = cheerio.load(cres.text);
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
    ```

- *extension:* 爬虫的时候使用代理地址
    1.   使用外部模块request实现客户端请求,加上代理参数proxy: proxy url,见示例: ./lesson3/requestviaproxy.js
    2.   使用外部模块pac-proxy-agent，解析.pac文件，见示例:./lesson3/proxyviapac.js
    3.   nodejs实现bigpipe,bigpipe是一种页面渲染机制，需要浏览器支持(ie6不支持),将一个大的页面分为多个模块，然后分模块渲染。假如这个大的页面全部渲染出来需要10s，假使这10s分配到4个子模块的渲染时间分别为1s,1s,3s,5s,服务端的机制就可以设计成首先渲染整个框架(1s)，然后依次去异步请求其他三个模块，哪个模块先到就先渲染哪个模块，那客户端显示的顺序就是1s的框架，1s的模块，3s的模块，5s的模块，对于用户来讲，1s就看到了布局，5s就看到了整个内容。示例代码: ./lesson3/bigpipe.js(代码来自网络，来源:[https://www.subbu.org/blog/2010/07/bigpipe-done-in-node-js](https://www.subbu.org/blog/2010/07/bigpipe-done-in-node-js)以后听到这个词应该不会被唬住了)

####2015/1/23

**lesson4:**

- *problem:*
    for循环和forEach的区别
    pipe的用法
