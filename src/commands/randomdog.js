exports.run = function (bot, msg) {
    msg.channel.sendMessage(':dog:');
    request.get('http://random.dog/woof', (err, res) => {
        msg.channel.sendMessage(`http://random.dog/${res.text}`);
    });
};

exports.info = {
    name: 'dog',
    usage: 'dog',
    description: 'The Bot will give you some Random Pictures of DOgs'
};
