exports.run = function (bot, message, args) {
    message.channel.sendMessage('Pong!')
        .then(m => m.edit(`**Pong! The Message took around** :stopwatch: \`${m.createdTimestamp - message.createdTimestamp}ms\``));
    message.delete();
};

exports.info = {
    name: 'ping',
    usage: 'ping',
    description: 'This command is to see how many Milliseconds will it takes for the bot to reply Back!'
};