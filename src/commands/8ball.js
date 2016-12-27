function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

exports.run = function(bot, message, args) {
if (!args[1]) message.channel.sendMessage(':8ball: :x: I Can not Reply to a Empty Question Boy! Try Again.')
		else {
			message.channel.sendMessage(rnd_selection(':8ball: It is certain', ':8ball: It is decidedly so', ':8ball: Without a doubt', ':8ball: Yes, definitely', ':8ball: Don\'t count on it', ':8ball: My reply is no', ':8ball: Outlook not so good', ':8ball: Very doubtful', ':8ball: Most likely', ':8ball: Reply hazy try again', ':8ball: Better not tell you now', ':8ball: Concentrate and ask again', ':8ball: My sources say no', ':8ball: You may rely on it', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again', ':8ball: Ask again later', ':8ball: As I see it, yes'))
		}
	}

 exports.info = {
    name: '8ball',
    usage: '8ball',
    description: 'Ask the 8ball any question about the Future. Good Luck :8ball:'
};      