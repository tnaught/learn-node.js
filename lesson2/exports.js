exports.foo = function() {
    return {
        foo: 'foo'
    }
}
exports.bar = function bar() {
    return {
        bar: 'bar'
    }
}
module.exports = {
    'foo': function() {
        return {
            'fool': 'foo1'
        }
    },
    'bar': function() {
        return {
            'bar': 'bar1'
        }
    }
};