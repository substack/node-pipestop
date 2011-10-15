pipestop
========

A `.pipe()` for node that you can stop.

example
=======

single.js
---------

````javascript
var pipestop = require('pipestop');
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
````

methods
=======

var pipestop = require('pipestop');

var pipe = pipestop(stream)
---------------------------

Create a new pipe function for a readable `stream`.

var stop = pipe(stream)
-----------------------

Pipe data from the readable stream from `pipestop()` to the writable `stream`
provided here.

stop()
------

Unbind all listeners that the writable stream from `pipe()` bound on the
writable stream from `pipestop()`.

license
=======

MIT/X11

install
=======

Using [npm](http://npmjs.org) do:

    npm install pipestop
