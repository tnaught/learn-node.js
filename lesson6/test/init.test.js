var should = require('should');
var init = require('../init.js');
//should 是一个断言库，mocha是一个测试框架
describe('test/init.test.js', function() {
    it('should equal 0 when n === 0', function() {
        init.fibonacci(0).should.equal(0);
    })
    it('should equal 1 when n === 1', function() {
        init.fibonacci(1).should.equal(1);
    })
    it('should throw when n > 10', function() {
        (function () {
            init.fibonacci(11);
        }).should.throw('n should <= 10');
    })
    it('should throw when n < 0', function() {
        (function () {
            init.fibonacci(-1);
        }).should.throw('n should >= 0');
    })
    it('should throw when n isnot number', function() {
        (function () {
            init.fibonacci('aaa');
        }).should.throw('n should be a number');
    })
    it('should equal 55 when n === 10', function() {
        init.fibonacci(10).should.equal(55);
    });
});