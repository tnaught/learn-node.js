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
