const bot = require('./bot');

exports.rnd_selection = function() {
    return String(arguments[Math.floor(Math.random() * arguments.length)]);
};

exports.rnd_color = function() {
     return exports.rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916);
        
};

