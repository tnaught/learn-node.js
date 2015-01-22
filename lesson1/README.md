使用express实现hello world的程序
===========

1.   what's express?
    [express](http://expressjs.com/)是基于node的一个web框架,使用`npm`(包管理工具)进行安装

2.   example:hello world
    
    ```
    var express = require('express');
    var app = express();

    //app提供了get/post/put/delete等方法，
    //第一个参数为route，第二个为callback,
    //callback中可以获取request和response两个对象
    app.get('/', function(req, res) {
        res.send('Hello World!');
    });

    //监听3000端口
    app.listen('3000', function() {});
    ```

3.   how to write the example just with node
    use `http` (node内置)library

    ```
    var http = require('http');
    //parameter: request event
    //return http.server class
    var server = http.createServer(function(req, res) {
        var body = 'Hello World!';
        res.writeHead(200, {
            'Content-length': body.length,
            'Content-type': 'text/plain'
        });
        //res can write multi-times
        res.write(body);
        //every response must excute end(),otherwise the connection will keep
        res.end();
    });
    server.listen(3000);
    ```
4.   extension:about http
    都说node是事件驱动的，那当然要了解什么是事件。我说理解的事件是一种程序流程控制的机制，在做A操作的时候就回预设A可能会带来的影响，暂时不会进行B操作，但是在一定条件的情况会触发B操作，可能触发B这样一个状态在我看来就是一个事件，而B本身是事件的句柄及执行函数。
    在node的document api中看http会发现有class、方法、事件这些概念，
    http的属性值:STATUS_CODES/globalAgent/IncomingMessage(为啥不是class)
    http的方法:createServer/createClient/request/get
    http的class:Server/ServerResponse/Agent/ClientRequest
    以server为例，server就是一个class，这个class下有request/connection/close等事件，还有listen/close等方法，还有timeout等属性

    EventEmitter: 
    objects which emit events are instances of events.EventEmitter
    when an event is emitted, functions which are attached to objects excuted,that can be call listeners.inside the listener function,this refered to the EventEmitter that the listener was attached to. 
    
    POST中最常用的两种编码方式:application/x-www-form-urlencoded和multipart/form-data

    response headers:
    content-type
    location
    content-length
    set-cookie
    content-encoding
    cache-control
    expires
    etag

    file type      |  MIME type
    ---------------|-----------
    ico            |  image/x-icon
    html           |  text/html
    js             |  text/javascript
    json           |  application/json
    css            |  text/css
    png            |  image/png