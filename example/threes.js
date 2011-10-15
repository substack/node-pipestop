var divert = require('../');
var EventEmitter = require('events').EventEmitter;

var em = new EventEmitter;
var pipe = divert(em);

(function () {
    var ix = 0;
    setInterval(function () {
        em.emit('data', ix++);
    }, 300);
})();

var s0 = new EventEmitter;
s0.writable = true;
s0.write = function (buf) {
    console.log('[0] ' + buf);
};

var s1 = new EventEmitter;
s1.writable = true;
s1.write = function (buf) {
    console.log('[1] ' + buf);
};

var stop = pipe(s0);

(function () {
    var ix = 0;
    setInterval(function () {
        stop();
        ix = (ix + 1) % 2;
        var s = [ s0, s1 ][ix];
        stop = pipe(s);
    }, 900);
})();
