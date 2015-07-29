var express = require('express');
var utility = require('utility');

var app = express();
app.get('/', function(req, res) {
    var q =req.query.q;
    if(q) {
        res.send(utility.md5(q));
    }
    else {
        res.send('error');
    }
});
app.listen(process.env.PORT || 3000, function() {
    console.log('listen to port 3000');
});
