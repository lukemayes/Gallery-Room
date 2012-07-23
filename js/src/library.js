Array.prototype.each = function(fun) {
    for (var i = 0; i < this.length; i++) {
        fun(this[i]);
    }
};

Array.prototype.collect = function(fun) {
    var result = [];
    this.each(function(it) {
        result.push(fun(it));
    });
    return result;
};

Object.prototype.keys = function() {
    var keys = [];
    $.each(this, function(key, value) {
        keys.push(key);
    });
    return keys;
};