var fs = require('fs');
var s = true;
fs.open('a.js', 'r', function(err, fd){
  console.log("lu");
  s = false;
});
// while (s) {
//   console.log(s);
// }
setTimeout(function() {
    s = false;
    console.log(s)
}, 100)