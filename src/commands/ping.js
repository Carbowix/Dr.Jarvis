exports.run = function(bot, message, args) {
    message.channel.sendMessage('Pong!')
        .then(m => m.edit(`**Pong! The Message took around** :stopwatch: \`${m.createdTimestamp - message.createdTimestamp}ms\``));
    message.delete();
};

exports.info = {
    name: 'ping',
    usage: 'ping',
    description: 'Pings Dr.Jarvis'
};