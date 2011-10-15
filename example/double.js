var pipestop = require('../');
var EventEmitter = require('events').EventEmitter;

var em = new EventEmitter;
var pipe = pipestop(em);

var ix = 0;
setInterval(function () {
    em.emit('data', ix++);
}, 500);

var s0 = fakeStream(0);
var stop0 = pipe(s0);

var s1 = fakeStream(1);
var stop1 = pipe(s1);

setTimeout(function () {
    stop0();
}, 1001);

setTimeout(function () {
    stop1();
}, 3001);

function fakeStream (id) {
    var s = new EventEmitter;
    s.writable = true;
    s.write = function (x) {
        console.log(id + ' wrote ' + x);
    };
    return s;
}
