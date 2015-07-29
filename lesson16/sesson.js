var express = require('express');
var session = require('express-session');

var app = express();
app.listen(5000);

app.use(session({
    secret: 'recommand 128 bytes random string',
    cookie: {maxAge: 60*1000}
}))

app.get('/', function(req, res) {
    if(req.session.isVisit) {
        req.session.isVisit++;
        res.send('次数：'+ req.session.isVisit);
    }
    else {
        req.session.isVisit = 1;
        res.send('welcome');
        console.log(req.session);
    }
})