const paste = require("better-pastebin")
exports.run = function (bot, message, args) {
var quotes = message.content.split('"');
var base = quotes[3] ? quotes[3]: ""
var title = quotes[1] ? quotes[1] : ""

if (!base)
        {
        message.channel.sendMessage(":x: Please enter a code."); return
        } else 
message.reply("**Creating the Paste..**").then(m => {    

    paste.create({
        name: `${title}`,
        contents: `'${base}'`,
        privacy: `0`
    }, function (success, data) {
        if (success) {
            m.edit('Here You Go: ' + data + '')
        } else {
            m.edit('Failed: (' + data + ')')
        }
    });
});
};

exports.info = {
    name: 'paste',
    usage: 'paste <name> <code>',
    description: 'Posts some text to pastebin'
}