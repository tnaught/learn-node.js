var m = {};
m.exports = {};
var f = function(e) {
    // e = {
    //     q: 1
    // } 
    e.q = 1;
};
f(m.exports);
console.log(m);