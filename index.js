var pipe = require('./lib/stop_stream');

module.exports = function (src) {
    return pipe.bind(null, src);
};
