exports.run = function (bot, message, args) {
    let name = args[0];
    contents = args.splice(1);

    bot.paste.create({
        name: `${name}`,
        contents: `'${content.join(' ')}'`,
        privacy: `0`
    }, function (success, data) {
        if (success) {
            message.reply('Here You Go: ' + data + '')
        } else {
            message.reply('Failed: (' + data + ')')
        }
    });
}

exports.info = {
    name: 'paste',
    usage: 'paste <name> <content>',
    description: 'Posts some text to pastebin'
}