gl = 'aa';
var parent = function() {
    var name = 'parent_name';
    var age = 13;

    var child = function() {
        var name = 'child_name';
        var childAge = 0.3;

        console.log(name, age, childAge)
    };

    child();

    console.log(name, age, childAge)
}

parent()