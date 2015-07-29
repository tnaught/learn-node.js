var fibonacci = function(num) {
    if(typeof num !== 'number') {
        throw new Error('n should be a number');
    }
    if(num === 0) {
        return 0;
    }
    if(num === 1) {
        return 1;
    }
    if(num < 0) {
        throw new Error('n should >= 0');
    }
    if(num > 10) {
        throw new Error('n should <= 10');
    }
    return fibonacci(num-1) + fibonacci(num-2);
}