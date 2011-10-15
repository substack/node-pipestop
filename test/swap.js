var test = require('tap').test;
var divert = require('../');
var EventEmitter = require('events').EventEmitter;

test('swap', function (t) {
    t.plan(1);
    
    var em = new EventEmitter;
    var pipe = divert(em);
    
    var iv0 = (function () {
        var ix = 0;
        return setInterval(function () {
            em.emit('data', ix++);
        }, 30);
    })();
    
    var res = [];
    
    var s0 = new EventEmitter;
    s0.writable = true;
    s0.write = function (i) {
        res.push([ 0, i ]);
    };
    
    var s1 = new EventEmitter;
    s1.writable = true;
    s1.write = function (i) {
        res.push([ 1, i ]);
    };
    
    var stop = pipe(s0);
    
    (function () {
        var ix = 0;
        var iv1 = setInterval(function () {
            stop();
            ix = (ix + 1) % 2;
            var s = [ s0, s1 ][ix];
            stop = pipe(s);
        }, 90);
        
        setTimeout(function () {
            clearInterval(iv0);
            clearInterval(iv1);
            
            t.deepEqual(res, [
                [ 0, 0 ],
                [ 0, 1 ],
                [ 0, 2 ],
                [ 1, 3 ],
                [ 1, 4 ],
                [ 1, 5 ],
                [ 0, 6 ],
                [ 0, 7 ],
                [ 0, 8 ],
                [ 1, 9 ],
            ]);
            stop();
            t.end();
        }, 305);
    })();
});
