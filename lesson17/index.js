var Q = require('q');
var defer = Q.defer();

function getInitialPromise() {
    return defer.promise;
}

getInitialPromise().then(function(success){
    console.log('success');
},function(error) {
    console.log('error');
},function(progress) {
    console.log('progress');
});
defer.notify('in progress');
defer.resolve('resolve');
defer.reject('reject');
