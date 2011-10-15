var pipestop = require('../');
var EventEmitter = require('events').EventEmitter;

var em = new EventEmitter;
var pipe = pipestop(em);

var ix = 0;
setInterval(function () {
    em.emit('data', ix++);
}, 500);

var s = fakeStream(1);
var stop = pipe(s);

setTimeout(function () {
    stop();
}, 3001);

function fakeStream () {
    var s = new EventEmitter;
    s.writable = true;
    s.write = function (x) {
        console.log('wrote ' + x);
    };
    return s;
}
