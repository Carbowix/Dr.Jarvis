function clean(text) {
	if (typeof (text) === 'string')
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	else
		return text;
}

exports.run = function(bot, message, args) {

if (message.author.id !== '176792365527203840') {
	 return message.reply("Only the Owner can use this Command! :)").catch(console.error);
    }
	else  {
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  }    

  exports.info = {
    name: 'eval',
    usage: 'eval <terms>',
    description: 'The Bot will evaluate anything for you.'
};   

